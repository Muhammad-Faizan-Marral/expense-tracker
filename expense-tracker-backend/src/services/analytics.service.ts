// ==========================================
// PHASE 2: FILTERING & SEARCH SERVICES
// ==========================================

import { Category, TransactionType } from "@prisma/client";
import prisma from "../config/db.js";

interface FilterQueryParams {
  type?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
}
export const filterTransactionsService = async (
  userId: string,
  filters: FilterQueryParams,
) => {
  const whereClause: any = { userId };
  if (filters.type) {
    whereClause.type = filters.type.toUpperCase() as TransactionType;
  }
  if (filters.category) {
    whereClause.category = filters.category?.toUpperCase() as Category;
  }
  if (filters.startDate || filters.endDate) {
    whereClause.createdAt = {};
    if (filters.startDate) {
      whereClause.createdAt.gte = new Date(filters.startDate);
    }
    if (filters.endDate) {
      whereClause.createdAt.lte = new Date(filters.endDate);
    }
  }
  return await prisma.transaction.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
  });
};

export const searchTransactionsService = async (
  userId: string,
  query: string,
) => {
  return await prisma.transaction.findMany({
    where: {
      userId,
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { notes: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { createdAt: "desc" },
  });
};

// ===========================
// PHASE 3: ANALYTICS SERVICES
// ===========================
export const getDashboardStatsService = async (userId: string) => {
  const aggregations = await prisma.transaction.groupBy({
    by: ["type"],
    where: { userId },
    _sum: { amount: true },
  });
  let totalIncome = 0;
  let totalExpense = 0;

  aggregations.forEach((item) => {
    if (item.type === "INCOME") totalIncome = item._sum.amount || 0;
    if (item.type === "EXPENSE") totalExpense = item._sum.amount || 0;
  });

  const balance = totalIncome - totalExpense;
  const savingsRate =
    totalIncome > 0 ? Math.round((balance / totalIncome) * 100) : 0;
  return {
    totalIncome,
    totalExpense,
    balance,
    savingsRate: savingsRate < 0 ? 0 : savingsRate, // Net negative savings prevent krne kay liye
  };
};

export const getCategoryAnalyticsService = async (userId: string) => {
  const categoryData = await prisma.transaction.groupBy({
    by: ["category"],
    where: { userId, type: "EXPENSE" },
    _sum: { amount: true },
    orderBy: { _sum: { amount: "desc" } },
  });

  return categoryData.map((item) => ({
    category: item.category.toLocaleLowerCase(),
    total: item._sum.amount || 0,
  }));
};

export const getMonthlyAnalyticsService = async (userId: string) => {
  const monthlyData: any[] = await prisma.$queryRaw`
    SELECT 
      TO_CHAR(DATE_TRUNC('month', "createdAt"), 'Mon') AS "month",
      SUM(CASE WHEN "type" = 'INCOME' THEN "amount" ELSE 0 END)::FLOAT AS "income",
      SUM(CASE WHEN "type" = 'EXPENSE' THEN "amount" ELSE 0 END)::FLOAT AS "expense"
    FROM "Transaction"
    WHERE "userId" = ${userId}
    GROUP BY DATE_TRUNC('month', "createdAt")
    ORDER BY DATE_TRUNC('month', "createdAt") ASC
  `;
  return monthlyData;
};
export const getLastXDaysAnalyticsService = async (userId: string, days: number) => {

  const daysData: any[] = await prisma.$queryRaw`
    SELECT 
      TO_CHAR("createdAt", 'YYYY-MM-DD') AS "date",
      SUM(CASE WHEN "type" = 'INCOME' THEN "amount" ELSE 0 END)::FLOAT AS "income",
      SUM(CASE WHEN "type" = 'EXPENSE' THEN "amount" ELSE 0 END)::FLOAT AS "expense"
    FROM "Transaction"
    WHERE "userId" = ${userId} AND "createdAt" >= NOW() - CAST(${days} || ' days' AS INTERVAL)
    GROUP BY TO_CHAR("createdAt", 'YYYY-MM-DD')
    ORDER BY "date" ASC
  `;

  return daysData;
};