import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/solid'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import Avatar from '../Avatar'

function PostShadow() {
  return (
    <div className='flex rounded-md border border-gray-300 bg-white shadow-sm overflow-hidden'>
        {/* Votes */}
        <div className='flex flex-col items-center justify-start w-14 h-full space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400'>
            <ArrowUpIcon className='text-gray-200' />
            <p className='text-black font-bold text-xs'><Skeleton /></p>
            <ArrowDownIcon className='text-gray-200' />
        </div>

        <div className='p-3 pb-1 overflow-hidden max-w-xs sm:max-w-none'>
          {/* Header */}
          <div className='flex items-center space-x-2'>
            <Avatar loading />
            <p className='text-xs text-gray-400'>
              <span className='font-bold text-black hover:text-blue-400 hover:underline'>
                <Skeleton />
              </span>
              <Skeleton />
            </p>
          </div>

          {/* Body */}
          <div className="py-4 w-96 md:w-[600px]">
            <h2 className='text-xl font-semibold'><Skeleton /></h2>
            <p className="mt-2 text-sm font-light"><Skeleton /></p>
          </div>
          <Skeleton width={'100%'} />
          {/* Footer */}
          <div className="flex space-x-4 text-gray-400">
            <div className='postButtons justify-start px-0'>
              <Skeleton containerClassName='h-6 w-20' height={24} />
            </div>
            <div className='postButtons justify-start px-0'>
              <Skeleton containerClassName='h-6 w-6 md:w-20' height={24} />
            </div>
            <div className='postButtons justify-start px-0'>
              <Skeleton containerClassName='h-6 w-6 md:w-20' height={24} />
            </div>
            <div className='postButtons justify-start px-0'>
              <Skeleton containerClassName='h-6 w-6 md:w-20' height={24} />
            </div>
            <div className='postButtons justify-start px-0'>
              <Skeleton containerClassName='h-6 w-6 md:w-8' height={24} />
            </div>
          </div>
      </div>
    </div>
  )
}

export default PostShadow