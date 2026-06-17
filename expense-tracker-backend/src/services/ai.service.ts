import prisma from "../config/db";

export const analyzeSpendingService = async (userId: string) => {
  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
      createdAt: {
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    },
    select: {
      title: true,
      amount: true,
      type: true,
      category: true,
    },
    orderBy: { createdAt: "desc" },
  });
  if (transactions.length === 0) {
    return {
      advice:
        "You have no transactions in the last 30 days. Please add transactions first for financial analysis.",
    };
  }
  const summary = transactions.map(
    (t) => `- [${t.type}] ${t.title}: PKR ${t.amount} (${t.category.toLowerCase()})`
  ).join('\n');
  const prompt = `
    You are an expert personal finance AI advisor. Analyze the following monthly transaction logs of a user and provide:
    1. A brief executive summary of their spending behavior.
    2. Identify potential issues (e.g., high shopping, overspending on food).
    3. Three actionable, highly descriptive financial tips to maximize savings.

    Keep the tone professional, encouraging, and clear. Format the response in concise Markdown bullet points.
    
    User Transactions:
    ${summary}
  `;
try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://localhost:5000", // Optional, leaderboard tracking
        "X-OpenRouter-Title": "Expense Tracker SaaS", // Optional
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL || "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "You are a professional financial consultant." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(data.error?.message || 'Failed to fetch from OpenRouter');
    }

    return {
      advice: data.choices[0].message.content.trim(),
    };
  } catch (error: any) {
    throw new Error(`AI Service Error: ${error.message}`);
  }
};