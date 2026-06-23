import { Request, Response } from 'express';
import * as aiService from '../services/ai.service.js';

// @desc    Analyze user transactions and generate AI advice (general ya specific question)
// @route   POST /api/ai/analyze
export const getSpendingAnalysis = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id!;
    const { question } = req.body || {}; // optional - frontend chat se aayega

    const analysis = await aiService.analyzeSpendingService(userId, question);
    res.status(200).json(analysis);
  } catch (error: any) {
    res.status(500).json({ message: 'Error processing AI Analysis', error: error.message });
  }
};