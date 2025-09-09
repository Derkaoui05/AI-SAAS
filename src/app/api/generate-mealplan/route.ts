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
      You are a professional nutritionist. Create a 7-day meal plan for an individual following a ${dietType} diet aiming for ${calories} calories per day.
      
      Allergies or restrictions: ${allergies || 'none'}.
      Preferred cuisine: ${cuisine || 'no preference'}.
      Snacks included: ${snacks ? 'yes' : 'no'}.
      
      For each day, provide:
        - Breakfast
        - Lunch
        - Dinner
        ${snacks ? '- Snacks' : ''}
      
      Use simple ingredients and provide brief instructions. Include approximate calorie counts for each meal.
      
      Structure the response as a JSON object where each day is a key, and each meal (breakfast, lunch, dinner, snacks) is a sub-key. Example:
      
      {
        "Sunday": {
          "Breakfast": "Oatmeal with fruits - 350 calories",
          "Lunch": "Grilled chicken salad - 500 calories",
          "Dinner": "Steamed vegetables with quinoa - 600 calories",
          "Snacks": "Greek yogurt - 150 calories"
        },
        "Monday": {
          "Breakfast": "Smoothie bowl - 300 calories",
          "Lunch": "Turkey sandwich - 450 calories",
          "Dinner": "Baked salmon with asparagus - 700 calories",
          "Snacks": "Almonds - 200 calories"
        }
        // ...and so on for each day
      }

      Return just the json with no extra commentaries and no backticks.
    `;

    console.log('Sending request to OpenRouter with model:', 'anthropic/claude-3.5-sonnet');

    const tryCompletion = async (maxTokensList: number[]): Promise<string> => {
      for (const maxTokens of maxTokensList) {
        try {
          const resp = await openai.chat.completions.create({
            model: 'anthropic/claude-3.5-sonnet',
            messages: [
              {
                role: 'user',
                content: prompt,
              },
            ],
            temperature: 0.7,
            max_tokens: maxTokens,
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

    const aiContent = await tryCompletion([1200, 900, 700]);
    console.log('AI Response received:', aiContent.substring(0, 200) + '...');

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

    let parsedMealPlan: { [day: string]: DailyMealPlan };
    try {
      const maybeJson = extractJson(aiContent);
      parsedMealPlan = JSON.parse(maybeJson);
    } catch (parseError) {
      console.error('Error parsing AI response as JSON:', parseError);
      console.error('Raw AI response:', aiContent);
      return NextResponse.json(
        { error: 'Failed to parse meal plan. Please try again.' },
        { status: 500 },
      );
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
