import { Request, Response } from "express";
import * as transactionService from "../services/transaction.service.js";

// @desc Create Transaction (Income/Expense)
// @route POST /api/transaction

export const createTransaction = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const transaction = await transactionService.createTransactionService(
      userId,
      req.body,
    );
    res
      .status(201)
      .json({ message: "Transaction created successfully", transaction });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// @desc    Get All Transactions with Pagination
// @route   GET /api/transactions

export const getAllTransactions = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

const page = parseInt(req.query.page ? String(req.query.page) : "1") || 1;
const limit = parseInt(req.query.limit ? String(req.query.limit) : "10") || 10;

    const result = await transactionService.getAllTransactionsService(
      userId,
      page,
      limit,
    );
    res.status(200).json(result);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// @desc Update Transaction
// @route PUT /api/transaction/:id

export const updateTransaction = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const transactionId = req.params.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const updatedTransaction =
      await transactionService.updateTransactionService(
        transactionId,
        userId,
        req.body,
      );
    res
      .status(200)
      .json({
        message: "Transaction updated successfully",
        updatedTransaction,
      });
  } catch (error: any) {
    const statusCode = error.message.includes("unauthorized") ? 403 : 500;
    res.status(statusCode).json({ message: error.message });
  }
};

// @desc    Delete Transaction
// @route   DELETE /api/transactions/:id

export const deleteTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const transactionId = req.params.id;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    await transactionService.deleteTransactionService(transactionId, userId);
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error: any) {
    const statusCode = error.message.includes('unauthorized') ? 403 : 500;
    res.status(statusCode).json({ message: error.message });
  }
};