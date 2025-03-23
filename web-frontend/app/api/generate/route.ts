import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Use the API key from the environment variable
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!); // Ensure to use the environment variable

export async function POST(request: Request) {
    const { prompt } = await request.json();

    // Call the Gemini API here
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);

        return NextResponse.json({ code: result.response.text() }); // Return the generated content
    } catch (err) {
        // Assert that err is an instance of Error
        const errorMessage = (err as Error).message || 'An unknown error occurred';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
} 