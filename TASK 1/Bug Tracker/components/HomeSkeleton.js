import React from 'react'

function HomeSkeleton() {
  return (
      <>
      <div className='h-9 w-40 rounded-md animate-pulse bg-gray-300'></div>
        <div className='py-2 grid grid-cols-1 sm:grid-cols-4 gap-5'>
            <div className='h-24 w-full rounded-md animate-pulse bg-gray-300'></div>
            <div className='h-24 w-full rounded-md animate-pulse bg-gray-300'></div>
            <div className='h-24 w-full rounded-md animate-pulse bg-gray-300'></div>
            <div className='h-24 w-full rounded-md animate-pulse bg-gray-300'></div>
        </div>

        <div className='mt-6 py-2 h-9 w-40 rounded-md animate-pulse bg-gray-300'></div>
        <div className='my-2 w-full h-72 rounded-md animate-pulse bg-gray-300'></div>

        <div className='mt-6 py-2 h-9 w-40 rounded-md animate-pulse bg-gray-300'></div>
        <div className='py-2 grid grid-cols-1 sm:grid-cols-4 gap-5'>
            <div className='h-16 w-full rounded-md animate-pulse bg-gray-300'></div>
            <div className='h-16 w-full rounded-md animate-pulse bg-gray-300'></div>
            <div className='h-16 w-full rounded-md animate-pulse bg-gray-300'></div>
            <div className='h-16 w-full rounded-md animate-pulse bg-gray-300'></div>
        </div>
      </>
    
  )
}

export default HomeSkeleton