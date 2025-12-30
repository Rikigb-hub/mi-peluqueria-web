
import { GoogleGenAI } from "@google/genai";

// Initialize the GoogleGenAI client using the environment variable directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getStyleRecommendation = async (description: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Sugiere un estilo de corte de pelo y arreglo personal para un cliente que dice: "${description}". Sé conciso y profesional en español.`,
      config: {
        systemInstruction: "Eres un barbero y estilista profesional de clase mundial. Proporciona consejos de estilo específicos, modernos y basados en la personalidad. Responde siempre en español.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Nuestro estilista IA está afilando sus tijeras. ¡Por favor, inténtalo de nuevo más tarde!";
  }
};

export const analyzeFaceShape = async (base64Image: string) => {
  try {
    const imagePart = {
      inlineData: {
        mimeType: 'image/jpeg',
        data: base64Image,
      },
    };
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { 
        parts: [
          imagePart, 
          { text: "Analiza la forma del rostro de esta persona y recomienda 3 peinados adecuados de la siguiente lista: Fade, Undercut, Buzz Cut, Pompadour, Long Flow, Side Part. También sugiere estilos de barba si aplica. Responde en español." }
        ] 
      },
    });
    return response.text;
  } catch (error) {
    console.error("Vision Error:", error);
    return "No se pudo analizar la forma del rostro en este momento.";
  }
};
