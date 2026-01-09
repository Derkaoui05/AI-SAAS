import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

if (!process.env.OPEN_ROUTER_API_KEY) {
  console.error('OPEN_ROUTER_API_KEY is not set in environment variables');
}

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPEN_ROUTER_API_KEY,
});

export async function POST(request: Request) {
  try {
    if (!process.env.OPEN_ROUTER_API_KEY) {
      console.error('Missing OPEN_ROUTER_API_KEY');
      return NextResponse.json(
        { error: 'API key not configured. Please check your environment variables.' },
        { status: 500 },
      );
    }

    const { dietType, calories, allergies, cuisine, snacks } = await request.json();

    if (!dietType || !calories) {
      return NextResponse.json(
        { error: 'Missing required parameters: dietType and calories are required.' },
        { status: 400 },
      );
    }

    const prompt = `
      You are a professional nutritionist. Create a concise 7-day meal plan for an individual following a ${dietType} diet aiming for ${calories} calories per day.
      
      Allergies or restrictions: ${allergies || 'none'}.
      Preferred cuisine: ${cuisine || 'no preference'}.
      Snacks included: ${snacks ? 'yes' : 'no'}.
      
      For each day (Sunday through Saturday), provide:
        - Breakfast
        - Lunch
        - Dinner
        ${snacks ? '- Snacks' : ''}
      
      Each meal should be a SHORT single-line string: a brief description and approximate calories, for example:
      "Oatmeal with berries - 400 calories"
      
      VERY IMPORTANT JSON RULES (STRICT):
      - Respond with a SINGLE valid JSON object.
      - The top-level object keys must be the day names: "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday".
      - Each day must be an object with keys "Breakfast", "Lunch", "Dinner"${
        snacks ? ', "Snacks"' : ''
      }.
      - Do NOT include comments (no // or /* */).
      - Do NOT include trailing commas.
      - Do NOT include any text before or after the JSON.
      - Do NOT wrap the JSON in markdown code fences.
      - Do NOT use ellipsis like "..." anywhere.
      - Make sure all strings are properly closed and all braces/brackets are balanced.
    `;

    console.log('Sending request to OpenRouter with model:', 'mistralai/devstral-2512:free');

    const tryCompletion = async (maxTokensList: number[]): Promise<string> => {
      for (const maxTokens of maxTokensList) {
        try {
          const resp = await openai.chat.completions.create({
            model: 'mistralai/devstral-2512:free',
            messages: [
              {
                role: 'user',
                content: prompt,
              },
            ],
            temperature: 0.7,
            max_tokens: maxTokens,
            // Ask OpenRouter/model to return strict JSON
            response_format: { type: 'json_object' },
          });
          return resp.choices[0].message.content!.trim();
        } catch (e: unknown) {
          const err = e as {
            status?: number;
            message?: string;
            response?: { status?: number; data?: { error?: string } | string };
          };
          const status = err?.status ?? err?.response?.status;
          const data = err?.response?.data;
          const msg = err?.message ?? (typeof data === 'string' ? data : data?.error);
          // If credits are insufficient for requested max_tokens, try a smaller cap
          if (status === 402) {
            const match = typeof msg === 'string' ? msg.match(/afford\s+(\d+)/i) : null;
            if (match) {
              const allowed = Math.max(200, parseInt(match[1], 10));
              const next = Math.min(allowed - 50, maxTokens - 100);
              if (Number.isFinite(next) && next > 200 && !maxTokensList.includes(next)) {
                maxTokensList.push(next);
              }
            }
            continue;
          }
          throw e;
        }
      }
      throw new Error('Unable to complete due to credit limits.');
    };

    const aiContent = await tryCompletion([700, 500, 350]);
    console.log('AI Response received (truncated):', aiContent.substring(0, 200) + '...');

    // Helper: try to robustly extract JSON from the model output
    const extractJson = (text: string): string => {
      // Strip code fences if present
      const fencedMatch = text.match(/```(?:json)?\n([\s\S]*?)```/i);
      const fenced = fencedMatch ? fencedMatch[1] : text;
      // Remove single-line comments that could appear inside example blocks
      const noComments = fenced
        .split('\n')
        .filter((line) => !/^\s*\/\//.test(line))
        .join('\n');
      // If extra prose exists around JSON, take substring between first { and last }
      const firstBrace = noComments.indexOf('{');
      const lastBrace = noComments.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        return noComments.slice(firstBrace, lastBrace + 1);
      }
      return noComments;
    };

    const parseMealPlan = (text: string): { [day: string]: DailyMealPlan } => {
      const base = extractJson(text);

      // First strict parse attempt
      try {
        return JSON.parse(base);
      } catch {
        // Best-effort "repair" for common JSON issues the model might introduce
        let repaired = base;

        // 1) Remove trailing commas before } or ]
        repaired = repaired.replace(/,\s*([}\]])/g, '$1');

        // 2) Normalise smart quotes to standard quotes
        repaired = repaired
          .replace(/[\u201C\u201D]/g, '"') // double smart quotes
          .replace(/[\u2018\u2019]/g, "'"); // single smart quotes

        // 3) Remove any non-printable control characters except newline, tab, carriage return
        repaired = repaired.replace(/[^\x20-\x7E\n\r\t]/g, '');

        return JSON.parse(repaired);
      }
    };

    let parsedMealPlan: { [day: string]: DailyMealPlan };

    try {
      // First attempt: parse the original completion
      parsedMealPlan = parseMealPlan(aiContent);
    } catch (parseError) {
      console.error('Error parsing AI response as JSON (first attempt):', parseError);
      console.error('Raw AI response (truncated):', aiContent.substring(0, 500) + '...');

      // Second attempt: ask the model to fix/return valid JSON only
      try {
        const repairPrompt = `
          You previously attempted to generate a JSON meal plan but the JSON was invalid or incomplete.
          Here is your previous response between <response> tags:

          <response>
          ${aiContent}
          </response>

          Please return a NEW, fully valid JSON object for a 7-day meal plan that matches the same intent.
          STRICT RULES:
          - Respond with a SINGLE valid JSON object only.
          - Do NOT include any comments, explanations, or markdown.
          - Do NOT include text before or after the JSON.
          - Do NOT wrap the JSON in code fences.
          - Ensure there are no trailing commas and all strings/braces are properly closed.
        `;

        const repairResp = await openai.chat.completions.create({
          model: 'mistralai/devstral-2512:free',
          messages: [
            {
              role: 'user',
              content: repairPrompt,
            },
          ],
          temperature: 0.2,
          max_tokens: 900,
          response_format: { type: 'json_object' },
        });

        const repairedContent = repairResp.choices[0].message.content!.trim();
        console.log(
          'Repaired AI JSON response (truncated):',
          repairedContent.substring(0, 200) + '...',
        );

        parsedMealPlan = parseMealPlan(repairedContent);
      } catch (repairError) {
        console.error('Error repairing/parsing AI JSON response:', repairError);
        return NextResponse.json(
          { error: 'Failed to parse meal plan. Please try again.' },
          { status: 500 },
        );
      }
    }

    if (typeof parsedMealPlan !== 'object' || parsedMealPlan === null) {
      throw new Error('Invalid meal plan format received from AI.');
    }

    console.log('Successfully parsed meal plan with', Object.keys(parsedMealPlan).length, 'days');

    return NextResponse.json({ mealPlan: parsedMealPlan });
  } catch (error: unknown) {
    console.error('Error generating meal plan:', error);

    type OpenRouterError = {
      status?: number;
      message?: string;
      response?: {
        status?: number;
        data?: { error?: string } | string;
      };
    };

    const err = error as OpenRouterError;
    const status = err?.status ?? err?.response?.status;
    const responseData = err?.response?.data;
    const responseError = typeof responseData === 'string' ? responseData : responseData?.error;
    const message = err?.message ?? responseError ?? 'Unexpected error';

    if (status === 401) {
      return NextResponse.json(
        { error: 'Authentication failed. Please check your API key.' },
        { status: 401 },
      );
    }
    if (status === 429) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 },
      );
    }
    if (typeof message === 'string' && message.toLowerCase().includes('model')) {
      return NextResponse.json(
        { error: 'Model not available. Please try a different model.' },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        error: `Failed to generate meal plan. ${
          typeof message === 'string' ? message : 'Please try again later.'
        }`,
      },
      { status: typeof status === 'number' ? status : 500 },
    );
  }
}

interface DailyMealPlan {
  Breakfast?: string;
  Lunch?: string;
  Dinner?: string;
  Snacks?: string;
}
