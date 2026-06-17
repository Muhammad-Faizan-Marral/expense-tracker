import prisma from '../config/db.js';

// 1. PIE CHART: Category wise Expense distribution
export const getPieChartDataService = async (userId: string) => {
  const expenses = await prisma.transaction.groupBy({
    by: ['category'],
    where: { userId, type: 'EXPENSE' },
    _sum: { amount: true },
  });

  return expenses.map((item) => ({
    name: item.category.toLowerCase(),
    value: item._sum.amount || 0,
  }));
};

// 2. BAR CHART: Monthly comparison
export const getBarChartDataService = async (userId: string) => {
  const rawData = await prisma.$queryRaw<
    Array<{ name: string; income: number; expense: number }>
  >`
    SELECT 
      TO_CHAR(DATE_TRUNC('month', "createdAt"), 'Mon') AS "name",
      SUM(CASE WHEN "type" = 'INCOME' THEN "amount" ELSE 0 END)::FLOAT AS "income",
      SUM(CASE WHEN "type" = 'EXPENSE' THEN "amount" ELSE 0 END)::FLOAT AS "expense"
    FROM "Transaction"
    WHERE "userId" = ${userId} AND "createdAt" >= NOW() - INTERVAL '12 months'
    GROUP BY DATE_TRUNC('month', "createdAt")
    ORDER BY DATE_TRUNC('month', "createdAt") ASC
  `;

  return rawData;
};

// 3. LINE CHART: Net Balance over last 30 days
export const getLineChartDataService = async (userId: string) => {
  const rawData = await prisma.$queryRaw<
    Array<{ date: string; netChange: number }>
  >`
    SELECT 
      TO_CHAR("createdAt", 'DD MMM') AS "date",
      SUM(CASE WHEN "type" = 'INCOME' THEN "amount" ELSE - "amount" END)::FLOAT AS "netChange"
    FROM "Transaction"
    WHERE "userId" = ${userId} AND "createdAt" >= NOW() - INTERVAL '30 days'
    GROUP BY DATE_TRUNC('day', "createdAt"), TO_CHAR("createdAt", 'DD MMM')
    ORDER BY DATE_TRUNC('day', "createdAt") ASC
  `;

  // Cumulative balance calculation
  let runningBalance = 0;
  return rawData.map((day) => {
    runningBalance += day.netChange;
    return {
      day: day.date,
      balance: runningBalance,
    };
  });
};