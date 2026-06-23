// src/hooks/useMonthlyReport.ts
import { useState, useCallback } from 'react';
import {
  fetchCurrentMonthPdf,
  triggerBlobDownload,
  parseBlobError,
} from '../services/report.service';

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Returns the full label for today's month — e.g. "June 2026" */
const getCurrentMonthLabel = (): string => {
  const d = new Date();
  return `${d.toLocaleString('default', { month: 'long' })} ${d.getFullYear()}`;
};

/** The label string of the current calendar month — computed once at module load */
export const CURRENT_MONTH_LABEL = getCurrentMonthLabel();

// ── Hook ──────────────────────────────────────────────────────────────────────

interface UseMonthlyReportReturn {
  /** Pass the report's month label (e.g. "June 2026") to kick off a download */
  download: (monthLabel: string) => Promise<void>;
  /** True while the PDF is being fetched from the backend */
  isDownloading: boolean;
  /** Non-null when the last attempt failed; display this to the user */
  downloadError: string | null;
  /** Call to dismiss the error banner */
  clearError: () => void;
}

export function useMonthlyReport(): UseMonthlyReportReturn {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const download = useCallback(async (monthLabel: string) => {
    // Backend only supports the CURRENT month — block silently for history
    if (monthLabel !== CURRENT_MONTH_LABEL) {
      setDownloadError(
        `PDF for ${monthLabel} is not yet available. Only the current month's report can be downloaded.`,
      );
      return;
    }

    setIsDownloading(true);
    setDownloadError(null);

    try {
      const blob = await fetchCurrentMonthPdf();

      // Guard: if the server returned JSON (auth failure etc.) it arrives as a Blob
      if (!blob.type.includes('pdf')) {
        const msg = await parseBlobError(blob);
        setDownloadError(msg);
        return;
      }

      const filename = `Financial_Report_${monthLabel.replace(' ', '_')}.pdf`;
      triggerBlobDownload(blob, filename);
    } catch (err: any) {
      let msg = 'Download failed. Please try again.';

      if (err?.response?.data instanceof Blob) {
        msg = await parseBlobError(err.response.data);
      } else if (typeof err?.response?.data?.message === 'string') {
        msg = err.response.data.message;
      } else if (typeof err?.message === 'string') {
        msg = err.message;
      }

      setDownloadError(msg);
    } finally {
      setIsDownloading(false);
    }
  }, []);

  return {
    download,
    isDownloading,
    downloadError,
    clearError: () => setDownloadError(null),
  };
}