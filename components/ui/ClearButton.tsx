interface ClearButtonProps {
  onClick: () => void
  label: string
}

export function ClearButton({ onClick, label }: ClearButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      aria-label={label}
      className='absolute right-3 top-1/2 -translate-y-1/2 p-1
        text-mocha/40 hover:text-mocha transition-colors duration-200'
    >
      <svg
        width='16'
        height='16'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M6 6L18 18M6 18L18 6'
          stroke='currentColor'
          strokeWidth='1.75'
          strokeLinecap='round'
        />
      </svg>
    </button>
  )
}
