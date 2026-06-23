// src/services/reportService.ts
import api from '../lib/api';

/**
 * Fetches the authenticated user's CURRENT-MONTH financial PDF.
 *
 * Endpoint : GET /api/reports/monthly-pdf
 * Auth     : Cookie-based (axios instance already has `withCredentials: true`)
 * Response : application/pdf binary blob
 *
 * ⚠️  When the server errors BEFORE streaming starts, Express returns a JSON
 *     body — but because responseType is 'blob', Axios delivers it as a Blob.
 *     Use `parseBlobError` to read the message from those cases.
 */
export const fetchCurrentMonthPdf = async (): Promise<Blob> => {
  const response = await api.get<Blob>('/reports/monthly-pdf', {
    responseType: 'blob',
  });
  return response.data;
};

/**
 * Reads a JSON `{ message: string }` error from a Blob response body.
 * Axios returns error payloads as Blobs when `responseType: 'blob'` is set.
 */
export const parseBlobError = async (blob: Blob): Promise<string> => {
  try {
    const text = await blob.text();
    const parsed = JSON.parse(text) as { message?: string };
    return parsed.message ?? 'Server error generating PDF.';
  } catch {
    return 'Error generating PDF report.';
  }
};

/**
 * Programmatically triggers a browser file-save dialog from a Blob.
 * Cleans up the object URL after click.
 */
export const triggerBlobDownload = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
};