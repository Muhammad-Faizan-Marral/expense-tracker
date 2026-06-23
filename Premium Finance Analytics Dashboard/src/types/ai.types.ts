export interface AIAnalysisResponse {
  advice: string;
}

export interface ChatMessage {
  id: number;
  role: "user" | "ai";
  text: string;
}