import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { soilType, cropType, season, location, nutrients } = body;

    // Validate required fields
    if (!soilType || !cropType || !season) {
      return NextResponse.json(
        { error: 'Missing required fields: soilType, cropType, season' },
        { status: 400 }
      );
    }

    // Create prompt
    const prompt = `
      As an agricultural expert, provide fertilizer recommendations for the following conditions:
      Soil Type: ${soilType}
      Crop Type: ${cropType}
      Season: ${season}
      Location: ${location || 'Not specified'}
      Current Nutrient Levels: ${nutrients || 'Not specified'}

      Please provide:
      1. Specific fertilizer recommendations with NPK ratios
      2. Application timing and frequency
      3. Dosage recommendations per acre/hectare
      4. Any additional soil management tips

      Format the response in a clear, structured manner suitable for farmers.
    `;

    // Call OpenRouter API via fetch
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an expert agricultural advisor specializing in fertilizer recommendations and soil management."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error?.message || 'API call failed' }, { status: response.status });
    }

    // Clean **bold** markdown
    const raw = data.choices[0]?.message?.content || '';
    const cleanedRecommendation = raw.replace(/\*\*(.*?)\*\*/g, '$1');  // Removes **bold** markdown

    return NextResponse.json({
      success: true,
      recommendation: cleanedRecommendation,
      inputData: { soilType, cropType, season, location, nutrients }
    });

  } catch (error: any) {
    console.error("Error calling OpenRouter:", error);
    return NextResponse.json(
      {
        error: "Failed to get fertilizer recommendation",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Fertilizer API is Working',
    timestamp: new Date().toISOString(),
    env_check: !!process.env.OPENROUTER_API_KEY
  });
}
