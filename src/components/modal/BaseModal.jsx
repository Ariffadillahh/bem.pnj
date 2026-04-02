import { useEffect } from "react";
import { createPortal } from "react-dom"; // 1. Import createPortal
import { X } from "lucide-react";

export default function BaseModal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = "max-w-md",
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // 2. Bungkus isi modal ke dalam sebuah variabel
  const modalContent = (
    <div
      // z-[9999] sekarang pasti berfungsi karena modal ada di root/body
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <div
        className={`bg-white rounded-xl shadow-xl w-full ${maxWidth} max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
            <h2 className="text-lg font-bold text-slate-900">{title}</h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-1.5 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        )}

        <div className="overflow-y-auto shrink p-6">{children}</div>

        {footer && (
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  // 3. Teleportasikan elemen ini langsung ke dalam document.body
  return createPortal(modalContent, document.body);
}
