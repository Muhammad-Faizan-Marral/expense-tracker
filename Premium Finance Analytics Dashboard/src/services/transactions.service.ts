import api from "../lib/api";
import type {
  Transaction,
  TransactionListResponse,
  CreateTransactionPayload,
  UpdateTransactionPayload,
} from "../types/transaction.types";

// GET /api/transactions?page=1&limit=10
export const fetchTransactions = async (
  page = 1,
  limit = 10
): Promise<TransactionListResponse> => {
  const res = await api.get("/transactions", { params: { page, limit } });
  return res.data;
};

// GET /api/transactions/search?q=...
export const searchTransactions = async (q: string): Promise<Transaction[]> => {
  const res = await api.get("/transactions/search", { params: { q } });
  return res.data.transactions ?? res.data;
};

// GET /api/transactions/filter?type=INCOME&category=FOOD
export const filterTransactions = async (params: {
  type?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
}): Promise<Transaction[]> => {
  // Strip "ALL" values — backend expects real values or nothing
  const clean = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v && v !== "ALL")
  );
  const res = await api.get("/transactions/filter", { params: clean });
  return res.data.transactions ?? res.data;
};

// POST /api/transactions
export const createTransaction = async (
  payload: CreateTransactionPayload
): Promise<Transaction> => {
  const res = await api.post("/transactions", payload);
  return res.data.transaction;
};

// PUT /api/transactions/:id
export const updateTransaction = async (
  id: string,
  payload: UpdateTransactionPayload
): Promise<Transaction> => {
  const res = await api.put(`/transactions/${id}`, payload);
  return res.data.updatedTransaction;
};

// DELETE /api/transactions/:id
export const deleteTransaction = async (id: string): Promise<void> => {
  await api.delete(`/transactions/${id}`);
};