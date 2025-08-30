import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

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

    const response = await openai.chat.completions.create({
      model: 'anthropic/claude-3.5-sonnet',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const aiContent = response.choices[0].message.content!.trim();
    console.log('AI Response received:', aiContent.substring(0, 200) + '...');

    let parsedMealPlan: { [day: string]: DailyMealPlan };
    try {
      parsedMealPlan = JSON.parse(aiContent);
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
  } catch (error) {
    console.error('Error generating meal plan:', error);

    if (error instanceof Error) {
      if (error.message.includes('401')) {
        return NextResponse.json(
          { error: 'Authentication failed. Please check your API key.' },
          { status: 401 },
        );
      } else if (error.message.includes('429')) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 },
        );
      } else if (error.message.includes('model')) {
        return NextResponse.json(
          { error: 'Model not available. Please try a different model.' },
          { status: 500 },
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to generate meal plan. Please try again later.' },
      { status: 500 },
    );
  }
}


interface DailyMealPlan {
  Breakfast?: string;
  Lunch?: string;
  Dinner?: string;
  Snacks?: string;
}
