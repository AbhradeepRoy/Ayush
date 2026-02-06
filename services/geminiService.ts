
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { UserProfile, DailyLog, ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const HEALTH_COACH_SYSTEM_PROMPT = `
You are AyushAI, a highly specialized Personal Health Coach AI.
Your primary mission is to help users optimize their lifestyle, nutrition, physical activity, and stress management.

CONTEXT-AWARE GUIDELINES:
1. USE COMPRESSED HISTORY: You will be provided with a 'Compressed Medical Profile'. Use this to inform your answers without requiring the user to repeat past conditions.
2. OPTIMIZED COST: Be concise. Summarize when possible.
3. NON-DIAGNOSTIC: You are NOT a doctor. You provide wellness coaching only.
4. MEDICAL DISCLAIMER: Always include a short disclaimer at the bottom of medical-related advice: "Disclaimer: I am an AI, not a healthcare professional. Please consult a doctor for diagnosis."
5. CULTURAL SENSITIVITY: Respect Indian dietary habits and cultural contexts where relevant.
6. MULTI-LANGUAGE: Respond strictly in the user's requested language.

USER PROFILE:
Age: {{age}}, Gender: {{gender}}, Lifestyle: {{lifestyle}}
Medical Profile: {{medical_profile}}
`;

export async function compressMedicalHistory(rawText: string, currentSummary: string): Promise<string> {
  const prompt = `
    Integrate the following new medical report/information into the existing health profile summary.
    New Info: "${rawText}"
    Current Summary: "${currentSummary}"
    
    Task: Create a unified, concise medical profile summary (under 200 words). Focus on chronic conditions, allergies, past major surgeries, and recent lab values.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text?.trim() || currentSummary;
  } catch (error) {
    console.error("Error compressing history:", error);
    return currentSummary;
  }
}

export async function getCoachResponse(
  query: string, 
  profile: UserProfile, 
  recentLogs: DailyLog[], 
  chatHistory: ChatMessage[]
): Promise<string> {
  const systemPrompt = HEALTH_COACH_SYSTEM_PROMPT
    .replace('{{age}}', profile.age.toString())
    .replace('{{gender}}', profile.gender)
    .replace('{{lifestyle}}', profile.lifestyle)
    .replace('{{medical_profile}}', profile.medicalHistorySummary);

  const logsContext = recentLogs.slice(-7).map(l => 
    `Date: ${l.date}, Steps: ${l.steps}, Sleep: ${l.sleep}hrs, Water: ${l.water}L, Mood: ${l.mood}`
  ).join('\n');

  const fullPrompt = `
    Language: ${profile.language}
    Recent Daily Data:
    ${logsContext}
    
    User Query: ${query}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: fullPrompt,
      config: {
        systemInstruction: systemPrompt,
      }
    });
    return response.text || "I'm sorry, I'm having trouble connecting to my knowledge base right now.";
  } catch (error) {
    console.error("Coach error:", error);
    return "Something went wrong. Please check your internet connection.";
  }
}

export async function getDailyHealthInsights(profile: UserProfile, logs: DailyLog[]): Promise<string> {
  const prompt = `
    Analyze the following health logs for the last few days and provide 3 key bullet-point insights (in ${profile.language}).
    Keep it actionable and positive.
    Logs: ${JSON.stringify(logs.slice(-5))}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: `You are a data-driven health coach. User language: ${profile.language}`,
      }
    });
    return response.text || "";
  } catch (error) {
    return "Keep up the consistent tracking!";
  }
}
