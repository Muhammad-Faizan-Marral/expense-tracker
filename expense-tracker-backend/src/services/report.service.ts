import prisma from '../config/db.js';
import PDFDocument from 'pdfkit';
import { Response } from 'express';

export const generateMonthlyPdfService = async (userId: string, res: Response) => {
  // 1. Current month ki range nikaalna
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

  // 2. Fetch User & Transactions data
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true, email: true },
  });

  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
      createdAt: { gte: startOfMonth, lte: endOfMonth },
    },
    orderBy: { createdAt: 'desc' },
  });

  if (!user) throw new Error('User not found');

  // 3. Calculations
  let totalIncome = 0;
  let totalExpense = 0;
  transactions.forEach((t) => {
    if (t.type === 'INCOME') totalIncome += t.amount;
    if (t.type === 'EXPENSE') totalExpense += t.amount;
  });
  const balance = totalIncome - totalExpense;

  // 4. PDF Kit Document setup
  const doc = new PDFDocument({ margin: 50 });

  // Response headers set krna ta kay file download ho sake
  const filename = `Financial_Report_${now.toLocaleString('default', { month: 'short' })}_${now.getFullYear()}.pdf`;
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

  doc.pipe(res);

  // --- PREMIUM DESIGN GENERATION ---
  
  // Header / Title Block
  doc.fillColor('#1e293b').fontSize(24).text('Orixa Expense Tracker', { bold: true });
  doc.fontSize(10).fillColor('#64748b').text('Premium Financial Analytics Statement');
  doc.moveDown(1.5);

  // User Profile Metadata
  doc.fillColor('#0f172a').fontSize(12).text(`Prepared For: ${user.name}`, { bold: true });
  doc.fontSize(10).fillColor('#475569').text(`Email: ${user.email}`);
  doc.text(`Statement Period: ${startOfMonth.toLocaleDateString()} - ${endOfMonth.toLocaleDateString()}`);
  doc.moveDown(2);

  // Financial Summary Cards Widget Layout (Visual KPIs)
  const summaryY = doc.y;
  doc.rect(50, summaryY, 150, 60).fill('#f1f5f9');
  doc.rect(220, summaryY, 150, 60).fill('#f1f5f9');
  doc.rect(390, summaryY, 150, 60).fill('#f1f5f9');

  // Labels inside cards
  doc.fillColor('#475569').fontSize(10).text('TOTAL INCOME', 60, summaryY + 10);
  doc.fillColor('#16a34a').fontSize(14).text(`PKR ${totalIncome}`, 60, summaryY + 30, { bold: true });

  doc.fillColor('#475569').fontSize(10).text('TOTAL EXPENSE', 230, summaryY + 10);
  doc.fillColor('#dc2626').fontSize(14).text(`PKR ${totalExpense}`, 230, summaryY + 30, { bold: true });

  doc.fillColor('#475569').fontSize(10).text('NET BALANCE', 400, summaryY + 10);
  doc.fillColor('#2563eb').fontSize(14).text(`PKR ${balance}`, 400, summaryY + 30, { bold: true });

  doc.moveDown(5);
  doc.y = summaryY + 90; // Reset text flow position after custom rectangle grids

  // Transaction Table Header
  doc.fillColor('#0f172a').fontSize(14).text('Transaction Logs', { bold: true });
  doc.moveDown(0.5);

  const tableTop = doc.y;
  doc.fontSize(10).fillColor('#475569');
  doc.text('Date', 50, tableTop, { bold: true });
  doc.text('Title', 130, tableTop, { bold: true });
  doc.text('Category', 280, tableTop, { bold: true });
  doc.text('Type', 390, tableTop, { bold: true });
  doc.text('Amount', 470, tableTop, { bold: true, align: 'right' });

  // Thin separator border line
  doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).strokeColor('#e2e8f0').stroke();

  // Populate rows
  let currentY = tableTop + 25;
  transactions.forEach((t) => {
    // Page breaking handling
    if (currentY > 700) {
      doc.addPage();
      currentY = 50; // top margin of new page
    }

    doc.fillColor('#0f172a');
    doc.text(new Date(t.createdAt).toLocaleDateString(), 50, currentY);
    doc.text(t.title, 130, currentY, { width: 140, ellipsis: true });
    doc.text(t.category.toLowerCase(), 280, currentY);
    
    // Color code transaction types text
    if (t.type === 'INCOME') {
      doc.fillColor('#16a34a').text('INCOME', 390, currentY);
    } else {
      doc.fillColor('#dc2626').text('EXPENSE', 390, currentY);
    }

    doc.fillColor('#0f172a').text(`PKR ${t.amount}`, 470, currentY, { align: 'right' });

    currentY += 20;
  });

  // Footer Branding Note
  doc.fontSize(8).fillColor('#94a3b8').text('Generated automatically via Orixa Engine Suite.', 50, 750, { align: 'center' });

  // Finalize PDF stream processing
  doc.end();
};