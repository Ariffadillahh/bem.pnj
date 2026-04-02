import { AlertTriangle, Loader2 } from "lucide-react"; 
import BaseModal from "./BaseModal";

export default function BaseConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Konfirmasi Aksi",
  message = "Apakah Anda yakin ingin melanjutkan?",
  confirmText = "Ya, Hapus", 
  loadingText = "Menghapus...", 
  cancelText = "Batal",
  isDanger = true,
  isLoading,
}) {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-sm"
      footer={
        <div className="flex justify-end gap-3 w-full">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2.5 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all font-semibold text-white ${
              isDanger
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            } disabled:opacity-70 disabled:cursor-not-allowed`}
          >
            {isLoading && <Loader2 className="animate-spin" size={16} />}
            {isLoading ? loadingText : confirmText}
          </button>
        </div>
      }
    >
      <div className="text-center py-2">
        <div
          className={`mx-auto w-14 h-14 rounded-full flex items-center justify-center mb-4 ${
            isDanger ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
          }`}
        >
          <AlertTriangle size={28} />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{message}</p>
      </div>
    </BaseModal>
  );
}
