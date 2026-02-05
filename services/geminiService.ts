
import { GoogleGenAI } from "@google/genai";

export async function suggestMessage(style: string, quantity: number): Promise<string> {
  // Fix: Always use process.env.API_KEY directly for initialization as per Google GenAI SDK guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Write a very short, cheerful 1-sentence gift message for someone receiving ${quantity} ${style} appointments. Keep it minimalist and cool.`,
      config: {
        maxOutputTokens: 60,
        temperature: 0.7,
      },
    });
    // Fix: Access .text property directly as it returns the string output
    return response.text?.trim() || "Enjoy your cuts!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Enjoy your fresh look!";
  }
}
