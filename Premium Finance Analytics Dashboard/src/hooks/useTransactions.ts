import { useState, useEffect, useCallback, useRef } from "react";
import type { AxiosError } from "axios";
import type {
  Transaction,
  TransactionMeta,
  TransactionFilters,
  CreateTransactionPayload,
  UpdateTransactionPayload,
} from "../types/transaction.types";
import * as service from "../services/transactions.service";

interface UseTransactionsReturn {
  // State
  transactions: Transaction[];
  meta: TransactionMeta | null;
  loading: boolean;
  error: string | null;
  filters: TransactionFilters;

  // Actions
  setFilters: (f: Partial<TransactionFilters>) => void;
  refetch: () => Promise<void>;
  addTransaction: (payload: CreateTransactionPayload) => Promise<void>;
  editTransaction: (id: string, payload: UpdateTransactionPayload) => Promise<void>;
  removeTransaction: (id: string) => Promise<void>;
}

const DEFAULT_FILTERS: TransactionFilters = {
  page: 1,
  limit: 10,
  type: "ALL",
  category: "ALL",
  search: "",
  sortBy: "date",
  sortDir: "desc",
};

export function useTransactions(): UseTransactionsReturn {
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  const [meta, setMeta] = useState<TransactionMeta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, _setFilters] = useState<TransactionFilters>(DEFAULT_FILTERS);
  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch from server (pagination only, filtering done client-side from loaded pages)
  const fetchFromServer = useCallback(async (page: number, limit: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await service.fetchTransactions(page, limit);
      setAllTransactions(res.transactions);
      setMeta(res.meta);
    } catch (e) {
      const err = e as AxiosError<{ message: string }>;
      setError(err.response?.data?.message ?? err.message ?? "Failed to load transactions");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load and page/limit change
  useEffect(() => {
    fetchFromServer(filters.page ?? 1, filters.limit ?? 10);
  }, [filters.page, filters.limit, fetchFromServer]);

  const refetch = useCallback(async () => {
    await fetchFromServer(filters.page ?? 1, filters.limit ?? 10);
  }, [filters.page, filters.limit, fetchFromServer]);

  const setFilters = useCallback((f: Partial<TransactionFilters>) => {
    // If search changes, debounce
    if ("search" in f) {
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
      searchDebounceRef.current = setTimeout(() => {
        _setFilters((prev) => ({ ...prev, ...f, page: 1 }));
      }, 300);
    } else {
      _setFilters((prev) => ({ ...prev, ...f }));
    }
  }, []);

  // Client-side filtering + sorting on top of fetched transactions
  const transactions = (() => {
    let txs = [...allTransactions];

    // Search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      txs = txs.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          (t.notes ?? "").toLowerCase().includes(q)
      );
    }

    // Type filter
    if (filters.type && filters.type !== "ALL") {
      txs = txs.filter((t) => t.type === filters.type);
    }

    // Category filter
    if (filters.category && filters.category !== "ALL") {
      txs = txs.filter((t) => t.category === filters.category);
    }

    // Sort
    txs.sort((a, b) => {
      const factor = filters.sortDir === "asc" ? 1 : -1;
      if (filters.sortBy === "amount") return factor * (a.amount - b.amount);
      return (
        factor *
        (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      );
    });

    return txs;
  })();

  const addTransaction = useCallback(
    async (payload: CreateTransactionPayload) => {
      setError(null);
      const tx = await service.createTransaction(payload).catch((e) => {
        const err = e as AxiosError<{ message: string }>;
        throw new Error(err.response?.data?.message ?? err.message);
      });
      setAllTransactions((prev) => [tx, ...prev]);
      setMeta((prev) =>
        prev ? { ...prev, total: prev.total + 1 } : prev
      );
    },
    []
  );

  const editTransaction = useCallback(
    async (id: string, payload: UpdateTransactionPayload) => {
      setError(null);
      const updated = await service.updateTransaction(id, payload).catch((e) => {
        const err = e as AxiosError<{ message: string }>;
        throw new Error(err.response?.data?.message ?? err.message);
      });
      setAllTransactions((prev) =>
        prev.map((t) => (t.id === id ? updated : t))
      );
    },
    []
  );

  const removeTransaction = useCallback(async (id: string) => {
    setError(null);
    await service.deleteTransaction(id).catch((e) => {
      const err = e as AxiosError<{ message: string }>;
      throw new Error(err.response?.data?.message ?? err.message);
    });
    setAllTransactions((prev) => prev.filter((t) => t.id !== id));
    setMeta((prev) =>
      prev ? { ...prev, total: Math.max(0, prev.total - 1) } : prev
    );
  }, []);

  return {
    transactions,
    meta,
    loading,
    error,
    filters,
    setFilters,
    refetch,
    addTransaction,
    editTransaction,
    removeTransaction,
  };
}