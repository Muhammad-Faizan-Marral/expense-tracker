import { Request, Response } from 'express';
import * as reportService from '../services/report.service.js';

// @desc    Generate and Download Monthly PDF Report
// @route   GET /api/reports/monthly-pdf
export const getMonthlyPdfReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id!;
    
    // Direct binary streaming passing express res interface
    await reportService.generateMonthlyPdfService(userId, res);
  } catch (error: any) {
    // Content-Type fallback check if document pipe breaks mid-way
    if (!res.headersSent) {
      res.status(500).json({ message: 'Error generating PDF statement report', error: error.message });
    }
  }
};