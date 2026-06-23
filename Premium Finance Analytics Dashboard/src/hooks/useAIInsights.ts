import { useState, useEffect, useCallback } from "react";
import type { AxiosError } from "axios";
import * as aiService from "../services/ai.service";
import type { ChatMessage } from "../types/ai.types";

interface UseAIInsightsReturn {
  messages: ChatMessage[];
  loading: boolean;       // initial general analysis load ho rahi hai
  isTyping: boolean;      // chat ka jawaab aa raha hai
  error: string | null;
  askQuestion: (question: string) => Promise<void>;
}

export function useAIInsights(): UseAIInsightsReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Page load par ek dafa general analysis fetch karo
  useEffect(() => {
    let cancelled = false;
    const loadInitial = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await aiService.analyzeSpending();
        if (cancelled) return;
        setMessages([{ id: Date.now(), role: "ai", text: res.advice }]);
      } catch (e) {
        if (cancelled) return;
        const err = e as AxiosError<{ message: string }>;
        setError(err.response?.data?.message ?? err.message ?? "AI analysis not load ");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    loadInitial();
    return () => { cancelled = true; };
  }, []);

  const askQuestion = useCallback(async (question: string) => {
    if (!question.trim()) return;

    setMessages((prev) => [...prev, { id: Date.now(), role: "user", text: question }]);
    setIsTyping(true);

    try {
      const res = await aiService.analyzeSpending(question);
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: "ai", text: res.advice }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "ai", text: "Sorry, Please try again." },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, []);

  return { messages, loading, isTyping, error, askQuestion };
}