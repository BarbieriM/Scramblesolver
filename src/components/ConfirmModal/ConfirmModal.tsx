import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";

import { Button } from "../Button/Button";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  confirmIcon?: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  open,
  title,
  message,
  confirmLabel,
  confirmIcon,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // The native dialog gives us focus trapping, Escape and the backdrop for free.
  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-message"
      onCancel={(event) => {
        // Escape key: let React state close the dialog.
        event.preventDefault();
        onCancel();
      }}
      onClick={(event) => {
        // A click on the dialog element itself is a click on the backdrop.
        if (event.target === event.currentTarget) {
          onCancel();
        }
      }}
      className="
        m-auto
        w-[calc(100%-2.5rem)]
        max-w-sm
        rounded-xl
        border
        border-gold
        bg-parchment-dark
        p-4
        shadow-card
        backdrop:bg-night/80
      "
    >
      <div
        className="
          space-y-4
          rounded-lg
          border
          border-copper
          bg-parchment
          p-4
        "
      >
        <h2 id="confirm-modal-title" className="text-lg font-bold text-ink">
          {title}
        </h2>

        <p id="confirm-modal-message" className="text-sm text-ink-light">
          {message}
        </p>

        <div className="flex gap-3">
          <Button type="button" variant="secondary" fullWidth onClick={onCancel}>
            <X size={17} />
            Cancel
          </Button>

          <Button type="button" variant="danger" fullWidth onClick={onConfirm}>
            {confirmIcon}
            {confirmLabel}
          </Button>
        </div>
      </div>
    </dialog>
  );
}
