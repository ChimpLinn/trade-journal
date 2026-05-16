'use client'

interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  destructive?: boolean
  loading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = '确定',
  cancelLabel = '取消',
  destructive = false,
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
      onClick={onCancel}
    >
      <article
        className="w-full max-w-sm animate-modal-in rounded-2xl bg-[var(--surface)] p-5 shadow-xl ring-1 ring-[var(--separator)]"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="confirm-title"
          className="text-[17px] font-semibold text-[var(--foreground)]"
        >
          {title}
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed text-[var(--secondary-label)]">
          {message}
        </p>
        <div className="mt-5 flex gap-2.5">
          <button
            type="button"
            disabled={loading}
            onClick={onCancel}
            className="flex-1 rounded-xl bg-[var(--background)] py-3 text-[15px] font-medium text-[var(--foreground)] disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className={`flex-1 rounded-xl py-3 text-[15px] font-semibold text-white disabled:opacity-50 ${
              destructive ? 'bg-[var(--danger)]' : 'bg-[var(--primary)]'
            }`}
          >
            {loading ? '处理中…' : confirmLabel}
          </button>
        </div>
      </article>
    </div>
  )
}
