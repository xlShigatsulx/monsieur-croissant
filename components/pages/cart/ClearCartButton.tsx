'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useCartActions, useCartData } from '@/context/CartContext'
import { ConfirmModal } from '@/components/ui/ConfirmModal'

export function ClearCartButton() {
  const t = useTranslations('cart')
  const { clearCart } = useCartActions()
  const { isLoading } = useCartData()
  const [isClearing, setIsClearing] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleConfirm = async () => {
    setIsClearing(true)
    try {
      await clearCart()
      setIsModalOpen(false)
    } finally {
      setIsClearing(false)
    }
  }

  return (
    <>
      <button
        type='button'
        onClick={() => setIsModalOpen(true)}
        disabled={isLoading}
        className='font-jost text-[11px] tracking-[0.2em] uppercase
          text-mocha/50 border border-mocha/20
          hover:border-red-400/60 hover:text-red-500 hover:bg-red-50/40
          rounded-full px-8 py-3 transition-all duration-300 inline-block
          disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-mocha/20 disabled:hover:text-mocha/50 disabled:hover:bg-transparent'
      >
        {t('clearCart')}
      </button>

      <ConfirmModal
        isOpen={isModalOpen}
        title={t('clearConfirmTitle')}
        description={t('clearConfirmDescription')}
        confirmLabel={isClearing ? t('clearing') : t('clearConfirmAction')}
        cancelLabel={t('cancel')}
        isConfirming={isClearing}
        onConfirm={handleConfirm}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  )
}
