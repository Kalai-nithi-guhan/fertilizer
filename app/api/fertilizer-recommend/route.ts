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

    // Prompt for OpenAI-like API
    const prompt = `
As an agricultural expert, provide fertilizer recommendations for the following conditions:
- Soil Type: ${soilType}
- Crop Type: ${cropType}
- Season: ${season}
- Location: ${location || 'Not specified'}
- Nutrient Info: ${nutrients || 'Not specified'}

Please respond with:
1. Specific fertilizer types and NPK ratios
2. Application frequency and best timing
3. Dosage (kg per acre/hectare)
4. Any additional soil improvement advice

Keep it short, structured, and suitable for farmers. Avoid technical jargon.
`;

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
      return NextResponse.json(
        { error: data.error?.message || 'AI API request failed' },
        { status: response.status }
      );
    }

    // Clean **bold** markdown and ``` blocks if any
    const rawContent = data.choices?.[0]?.message?.content || '';
    const cleanedContent = rawContent
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/```[\s\S]*?```/g, '') // Remove code blocks
      .trim();

    return NextResponse.json({
      success: true,
      recommendation: cleanedContent,
      inputData: { soilType, cropType, season, location, nutrients }
    });

  } catch (error: unknown) {
    console.error("Error during fertilizer recommendation:", error);
    return NextResponse.json(
      {
        error: "Failed to get fertilizer recommendation",
        details:
          process.env.NODE_ENV === "development" && error instanceof Error
            ? error.message
            : undefined
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: '✅ Fertilizer Recommendation API is live',
    timestamp: new Date().toISOString(),
    envCheck: !!process.env.OPENROUTER_API_KEY
  });
}
