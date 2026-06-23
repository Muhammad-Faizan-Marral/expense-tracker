export type TransactionType = "INCOME" | "EXPENSE";

export type Category =
  | "FOOD"
  | "SALARY"
  | "FREELANCING"
  | "SHOPPING"
  | "BILLS"
  | "TRAVEL"
  | "INVESTMENT"
  | "ENTERTAINMENT"
  | "OTHER";

export interface Transaction {
  id: string;
  userId: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: Category;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TransactionListResponse {
  transactions: Transaction[];
  meta: TransactionMeta;
}

export interface CreateTransactionPayload {
  title: string;
  amount: number;
  type: TransactionType;
  category: Category;
  notes?: string;
}

export type UpdateTransactionPayload = Partial<CreateTransactionPayload>;

export interface TransactionFilters {
  page?: number;
  limit?: number;
  type?: TransactionType | "ALL";
  category?: Category | "ALL";
  search?: string;
  sortBy?: "date" | "amount";
  sortDir?: "asc" | "desc";
}
