import prisma from "../config/db.js";
import { TransactionType, Category } from "@prisma/client";

interface CreateTransactionInput {
  title: string;
  amount: number;
  type: string;
  category: string;
  notes?: string;
}

export const createTransactionService = async (
  userId: string,
  data: CreateTransactionInput,
) => {
  const dbType = data.type.toUpperCase() as TransactionType;
  const dbCategory = data.category.toUpperCase() as Category;

  return await prisma.transaction.create({
    data: {
      userId,
      title: data.title,
      amount: data.amount,
      type: dbType,
      category: dbCategory,
      notes: data.notes || null,
    },
  });
};

export const getAllTransactionsService = async (
  userId: string,
  page: number,
  limit: number,
) => {
  const skip = (page - 1) * limit;

  // Run total count and find query concurrently for better performance
  const [transactions, total] = await prisma.$transaction([
    prisma.transaction.findMany({
      where: { userId },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.transaction.count({ where: { userId } }),
  ]);

  return {
    transactions,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const updateTransactionService = async (
  transactionId: string,
  userId: string,
  data: Partial<CreateTransactionInput>,
) => {
  const transaction = await prisma.transaction.findUnique({
    where: { id: transactionId },
  });
  if (!transaction || transaction.userId !== userId) {
    throw new Error("Transaction not found or unauthorized");
  }

  const updateData: any = { ...data };
  if (data.type) updateData.type = data.type.toUpperCase() as TransactionType;
  if (data.category)
    updateData.category = data.category.toUpperCase() as Category;

  return await prisma.transaction.update({
    where: { id: transactionId },
    data: updateData,
  });
};

export const deleteTransactionService = async (
  transactionId: string,
  userId: string,
) => {
  const transaction = await prisma.transaction.findUnique({
    where: { id: transactionId },
  });
  if (!transaction || transaction.userId !== userId) {
    throw new Error("Transaction not found or unauthorized");
  }
  return await prisma.transaction.delete({
    where: { id: transactionId },
  });
};
