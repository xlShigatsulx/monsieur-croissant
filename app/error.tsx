'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold text-gray-900 mb-4'>Oops!</h1>
        <p className='text-lg text-gray-600 mb-8'>
          Something went wrong. We're sorry for the inconvenience.
        </p>
        <div className='flex gap-4 justify-center'>
          <button
            onClick={() => reset()}
            className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
          >
            Try Again
          </button>
          <Link
            href='/'
            className='px-6 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300'
          >
            Back Home
          </Link>
        </div>
      </div>
    </div>
  )
}
