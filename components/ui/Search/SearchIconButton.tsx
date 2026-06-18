'use client'

export function SearchIconButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type='button'
      onClick={onClick}
      aria-label='search'
      className='p-2 rounded-full hover:bg-mocha/5 transition-colors duration-300'
    >
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='text-mocha'
      >
        <circle
          cx='11'
          cy='11'
          r='7'
          stroke='currentColor'
          strokeWidth='1.75'
        />
        <path
          d='M21 21L16.65 16.65'
          stroke='currentColor'
          strokeWidth='1.75'
          strokeLinecap='round'
        />
      </svg>
    </button>
  )
}
