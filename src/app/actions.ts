
'use server';

import { empatheticResponse } from "@/ai/flows/empathetic-response";
import { personalizedSelfCare } from "@/ai/flows/personalized-self-care";
import type { Message } from "@/types";

const keywords: Record<string, string> = {
  stressed: 'stressed',
  overwhelmed: 'overwhelmed',
  sad: 'sadness',
  anxiety: 'anxiety',
  lonely: 'loneliness',
  loneliness: 'loneliness',
};

function extractEmotion(text: string): string | undefined {
  const lowerText = text.toLowerCase();
  for (const keyword in keywords) {
    if (lowerText.includes(keyword)) {
      return keywords[keyword];
    }
  }
  return undefined;
}

export async function getAIResponse(history: Omit<Message, 'id' | 'suggestions'>[], userName?: string) {
  const lastMessage = history[history.length - 1];
  if (!lastMessage || lastMessage.role !== 'user') {
    return null;
  }
  const userInput = lastMessage.content;
  

  try {
    const empatheticPromise = empatheticResponse({ history, userName });
    
    const emotion = extractEmotion(userInput);
    const selfCarePromise = emotion 
      ? personalizedSelfCare({ emotion })
      : Promise.resolve({ suggestions: [] });

    const [empatheticResult, selfCareResult] = await Promise.all([
      empatheticPromise,
      selfCarePromise,
    ]);

    return {
      content: empatheticResult.response,
      suggestions: selfCareResult.suggestions,
    };
  } catch (error) {
    console.error("Error getting AI response:", error);
    return {
      content: "Oh, honey. It seems my circuits are a bit frazzled right now. I'm so sorry, I can't quite find the right words. Could you try telling me again in a moment?",
      suggestions: [],
    };
  }
}
