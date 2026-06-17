import { Request, Response } from 'express';
import * as chartsService from '../services/charts.service.js';

// @desc    Get data for category expense distribution (Pie Chart)
// @route   GET /api/charts/pie
export const getPieChartData = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id!;
    const data = await chartsService.getPieChartDataService(userId);
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching pie chart data', error: error.message });
  }
};

// @desc    Get data for income vs expense analytics trends (Bar Chart)
// @route   GET /api/charts/bar
export const getBarChartData = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id!;
    const data = await chartsService.getBarChartDataService(userId);
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching bar chart data', error: error.message });
  }
};

// @desc    Get cumulative net balance progress trajectory lines over 30 days (Line Chart)
// @route   GET /api/charts/line
export const getLineChartData = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id!;
    const data = await chartsService.getLineChartDataService(userId);
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching line chart data', error: error.message });
  }
};