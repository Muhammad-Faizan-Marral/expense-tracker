import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useState } from "react";

interface Props {
  open: boolean;
  title?: string;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
}

export function DeleteConfirmDialog({ open, title, onCancel, onConfirm }: Props) {
  const [deleting, setDeleting] = useState(false);

  const handleConfirm = async () => {
    setDeleting(true);
    try {
      await onConfirm();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70"
            style={{ backdropFilter: "blur(6px)" }}
            onClick={onCancel}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.25 }}
            className="relative w-full max-w-sm rounded-2xl border border-red-500/20 p-6 z-10"
            style={{ background: "#111116" }}
          >
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "rgba(239,68,68,0.1)" }}>
                <AlertTriangle size={22} className="text-red-400" />
              </div>
              <div>
                <h3 className="font-bold text-base">Delete Transaction?</h3>
                {title && (
                  <p className="text-sm text-muted-foreground mt-1">
                    "{title}" will be permanently deleted.
                  </p>
                )}
              </div>
              <div className="flex gap-3 w-full mt-1">
                <button
                  onClick={onCancel}
                  className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={deleting}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-1.5 disabled:opacity-60 transition-opacity"
                  style={{ background: "#ef4444" }}
                >
                  {deleting ? <Loader2 size={14} className="animate-spin" /> : null}
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}