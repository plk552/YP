import { GoogleGenAI } from "@google/genai";
import { EQUIPMENT_CATALOG, PRESET_PACKAGES } from '../constants';
import { Purpose } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `
Ты опытный технический специалист в сервисе аренды фото и видео техники "RentPro".
Твоя цель - помогать клиентам подбирать оборудование.
Твой тон - профессиональный, но дружелюбный и лаконичный.
Сайт выполнен в темной теме, стиль "премиум".

У тебя есть доступ к следующему списку оборудования (каталог):
${JSON.stringify(EQUIPMENT_CATALOG.map(e => ({ name: e.name, category: e.category })))}

И доступные готовые тарифы:
${JSON.stringify(PRESET_PACKAGES.map(p => ({ title: p.title, purpose: p.purpose, description: p.description })))}

Если клиент спрашивает, что выбрать для конкретной цели (например, "снять клип в темноте"), посоветуй конкретное оборудование из списка выше.
Отвечай коротко, по существу. Не используй markdown разметку слишком обильно, только для выделения названий техники.
`;

export const sendMessageToGemini = async (message: string, history: { role: 'user' | 'model', text: string }[]): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: systemInstruction,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: message });
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Извините, сейчас я не могу ответить. Пожалуйста, попробуйте позже или позвоните нам.";
  }
};

export const detectPurposeFromPrompt = async (prompt: string): Promise<Purpose | null> => {
  try {
     const result = await ai.models.generateContent({
       model: 'gemini-2.5-flash',
       contents: `Analyze the user's intent: "${prompt}". Map it to exactly ONE of the following purposes: TikTok, YouTube, Свадьба, Реклама, Путешествие. Return ONLY the string of the purpose. If it doesn't match closely, return 'YouTube' as fallback.`,
     });
     
     const text = result.text.trim();
     
     // Simple mapping to ensure enum match
     if (text.includes('TikTok')) return Purpose.TikTok;
     if (text.includes('YouTube')) return Purpose.YouTube;
     if (text.includes('Свадьба') || text.includes('Wedding')) return Purpose.Wedding;
     if (text.includes('Реклама') || text.includes('Commercial')) return Purpose.Commercial;
     if (text.includes('Путешествие') || text.includes('Travel')) return Purpose.Travel;
     
     return Purpose.YouTube;
  } catch (e) {
    console.error("Error detecting purpose", e);
    return Purpose.YouTube;
  }
};
