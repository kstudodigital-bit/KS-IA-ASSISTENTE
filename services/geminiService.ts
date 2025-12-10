import { GoogleGenAI } from "@google/genai";
import { Message } from '../types';

// Initialize the Gemini API client
// Note: In a real production app, ensure strict backend proxying or secure environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Você é o "KS Digital Helper", um assistente virtual especialista em Marketing Digital da agência "KS-Tudo Digital".
Sua missão é ajudar clientes a tirarem dúvidas sobre:
- Marketing digital
- Anúncios pagos (Facebook Ads, Google Ads, Instagram Ads)
- Tráfego pago
- Lançamentos
- Estratégias de vendas
- Branding
- Funil de vendas
- SEO
- Conteúdo para redes sociais

Diretrizes:
1. Responda de forma clara, profissional, simples e direta.
2. Use formatação Markdown (negrito, listas) para facilitar a leitura em mobile.
3. Se o usuário perguntar sobre serviços complexos, recomende que ele agende uma consultoria com a equipe humana da KS-Tudo Digital.
4. Mantenha um tom encorajador e autoritário no assunto.
5. Se receber uma imagem, analise-a no contexto de marketing (ex: feedback de criativo, análise de métricas).
`;

export const sendMessageToGemini = async (
  history: Message[],
  currentMessage: string,
  imageBase64?: string
): Promise<string> => {
  try {
    // Format history for the model (simplified context window for this demo)
    // We take the last few messages to maintain context without overloading tokens
    const recentHistory = history.slice(-5).map(msg => msg.text).join('\n');
    
    const prompt = `
      Histórico da conversa:
      ${recentHistory}
      
      Usuário: ${currentMessage}
    `;

    const parts: any[] = [{ text: prompt }];

    if (imageBase64) {
      // Remove data URL prefix if present (e.g., "data:image/jpeg;base64,")
      const base64Data = imageBase64.split(',')[1];
      parts.unshift({
        inlineData: {
          mimeType: 'image/jpeg', // Assuming jpeg for simplicity, realistically detect type
          data: base64Data
        }
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: parts
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        thinkingConfig: { thinkingBudget: 0 } // Fast response for chat
      }
    });

    return response.text || "Desculpe, não consegui processar sua resposta no momento.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "Ocorreu um erro ao conectar com o servidor da KS Digital. Tente novamente.";
  }
};