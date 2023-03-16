import React from 'react'

function NewProjectSkeleton() {
  return (
    <div className='grid gap-8 grid-cols-1 md:grid-cols-2'>
        <div>
            <div className='my-3 bg-gray-300 animate-pulse h-10 rounded-lg'></div>
            <div className='my-3 bg-gray-300 animate-pulse h-10 rounded-lg'></div>
            <div className='my-3 bg-gray-300 animate-pulse h-32 rounded-lg'></div>
            <div className='flex justify-end'>
                <div className='my-3 bg-gray-300 animate-pulse h-10 w-32 mx-3  rounded-lg'></div>
                <div className='my-3 bg-gray-300 animate-pulse h-10 w-32 rounded-lg'></div>
            </div>
        </div>
        <div>
            <div className='my-3 bg-gray-300 animate-pulse h-10 rounded-lg'></div>
            <div className='my-3 bg-gray-300 animate-pulse h-96 rounded-lg'></div>
        </div>
    </div>
  )
}
export default NewProjectSkeleton