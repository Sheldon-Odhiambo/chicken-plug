
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSpiceRecommendation = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a professional Kenyan head chef specializing in Barut and Nakuru regional cuisine. 
      Your goal is to help customers of "Chicken Plug" use their spices to create amazing meals.
      
      Inventory: Cayenne pepper, Ginger, Paprika, Turmeric, Beef masala, Nutmeg, Cloves, Mixed Spices, Thafai, Mukhombero, Black pepper, Rosemary, Hibiscus Tea, Pilau Masala, Chicken Masala, Cinnamon, Tea Masala, Coffee, Dhania Powder, Cumin, Cardamom, Curry Powder.
      
      RULES:
      1. If a user asks about a specific spice, YOU MUST suggest at least 2 common food pairings or specific dishes it works well in.
      2. For example, if they ask about Cinnamon, suggest its use in baking, tea, or even savory stews. 
      3. For Pilau Masala, mention it's best for beef or chicken pilau and hint at adding a touch of whole cloves for extra aroma.
      4. Use a warm, professional, and slightly artistic tone (mentioning "aromas", "flavor profiles", and "culinary magic").
      5. Keep it concise but mouth-watering.
      
      User question: "${query}"`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The kitchen is a bit foggy right now! I couldn't reach my spice rack. Please try asking again or check our Pilau Masala—it's Nakuru's finest!";
  }
};
