import api from "../lib/api";
import type { AIAnalysisResponse } from "../types/ai.types";

// POST /api/ai/analyze
// question diye bina -> general monthly analysis
// question ke saath -> specific chat answer
export const analyzeSpending = async (question?: string): Promise<AIAnalysisResponse> => {
  const res = await api.post(
    "/ai/analyze",
    question ? { question } : {},
    { timeout: 30000 } // 👈 ye line add karo
  );
  return res.data;
};