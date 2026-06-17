import { Request, Response } from 'express';
import * as analyticsService from '../services/analytics.service.js';

// @desc    Filter Transactions
// @route   GET /api/transactions/filter
export const filterTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id!;
    const result = await analyticsService.filterTransactionsService(userId, req.query);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: 'Error filtering transactions', error: error.message });
  }
};

// @desc    Search Transactions
// @route   GET /api/transactions/search
export const searchTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id!;
    const query = (req.query.q as string) || '';
    const result = await analyticsService.searchTransactionsService(userId, query);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: 'Error searching transactions', error: error.message });
  }
};

// @desc    Get Main Dashboard Stats (Income, Expense, Balance, Savings Rate)
// @route   GET /api/analytics/dashboard
export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id!;
    const stats = await analyticsService.getDashboardStatsService(userId);
    res.status(200).json(stats);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching dashboard stats', error: error.message });
  }
};

// @desc    Get Category Wise Expense Breakdown (GROUP BY)
// @route   GET /api/analytics/categories
export const getCategoryAnalytics = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id!;
    const data = await analyticsService.getCategoryAnalyticsService(userId);
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching category analytics', error: error.message });
  }
};

// @desc    Get Monthly Income vs Expense Timeline
// @route   GET /api/analytics/monthly
export const getMonthlyAnalytics = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id!;
    const data = await analyticsService.getMonthlyAnalyticsService(userId);
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching monthly analytics', error: error.message });
  }
};

// @desc    Get Analytics for last X days (e.g. 7 days, 30 days)
// @route   GET /api/analytics/last-days
export const getLastXDaysAnalytics = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id!;
    const days = parseInt(req.query.days as string) || 30;
    const data = await analyticsService.getLastXDaysAnalyticsService(userId, days);
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching historical analytics', error: error.message });
  }
};