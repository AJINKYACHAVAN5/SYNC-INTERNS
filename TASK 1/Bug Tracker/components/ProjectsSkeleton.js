import React from 'react'

function ProjectsSkeleton() {
  return (
      <>
          <div className='h-12 bg-gray-300 animate-pulse w-40 rounded-md'></div>
          <div className='h-3/4 bg-gray-300 animate-pulse w-full border-2 p-2 my-2 rounded-md'></div>
          <div className='h-3/4 bg-gray-300 animate-pulse w-full border-2 p-2 my-2 rounded-md'></div>
          <div className='h-3/4 bg-gray-300 animate-pulse w-full border-2 p-2 my-2 rounded-md'></div>
      </>

  )
}

export default ProjectsSkeleton