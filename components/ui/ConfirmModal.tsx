'use client'

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

interface ConfirmModalProps {
  isOpen: boolean
  title: string
  description?: string
  confirmLabel: string
  cancelLabel: string
  isConfirming?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmModal({
  isOpen,
  title,
  description,
  confirmLabel,
  cancelLabel,
  isConfirming = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    dialogRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onCancel])

  if (!isOpen) return null

  return createPortal(
    <div
      className='fixed inset-0 z-50 flex items-center justify-center px-4'
      role='presentation'
    >
      <div
        className='absolute inset-0 bg-mocha/40 backdrop-blur-sm transition-opacity duration-300'
        onClick={onCancel}
        aria-hidden='true'
      />

      <div
        ref={dialogRef}
        role='alertdialog'
        aria-modal='true'
        aria-labelledby='confirm-modal-title'
        aria-describedby={description ? 'confirm-modal-description' : undefined}
        tabIndex={-1}
        className='relative z-10 w-full max-w-sm rounded-2xl bg-[#ffeddb] p-6
          shadow-2xl outline-none animate-in fade-in zoom-in-95 duration-200'
      >
        <h1
          id='confirm-modal-title'
          className='font-cormorant text-4xl text-mocha font-light mb-2'
        >
          {title}
        </h1>

        {description && (
          <p
            id='confirm-modal-description'
            className='font-jost text-sm text-mocha/60 mb-6'
          >
            {description}
          </p>
        )}

        <div className='flex gap-3 justify-between'>
          <button
            type='button'
            onClick={onCancel}
            disabled={isConfirming}
            className='font-jost text-[11px] tracking-[0.2em] uppercase
              text-mocha/60 border border-mocha/20
              hover:border-mocha/50 hover:bg-mocha/5 hover:text-mocha
              rounded-full px-6 py-3 transition-all duration-300
              disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-mocha/60'
          >
            {cancelLabel}
          </button>
          <button
            type='button'
            onClick={onConfirm}
            disabled={isConfirming}
            aria-busy={isConfirming}
            className='font-jost text-[11px] tracking-[0.2em] uppercase
              text-red-600 border border-red-300
              hover:border-red-500 hover:bg-red-50 hover:text-red-700
              rounded-full px-6 py-3 transition-all duration-300
              disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-red-600 disabled:hover:border-red-300'
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
