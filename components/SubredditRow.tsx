import { ChevronUpIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React from 'react'
import Avatar from './Avatar'

type Props = {
    topic: string
    index: number
    loading?: boolean
}

function SubredditRow({index, topic, loading}: Props) {
  return (
    <div className='flex items-center space-x-2 border-t bg-white px-4 py-2 last:rounded-b w-[268px]'>
        <p>{index + 1}</p>
        {!loading ? <ChevronUpIcon className="h-4 w-4 text-green-400 " /> : <span className='h-4 w-4' />}
        {!loading ? <Avatar seed={topic} /> : <span className=' h-10 w-10' />}
        {!loading ? <p className='flex-1 truncate'>r/{topic}</p> : <p className='flex-1 truncate'>{' '}</p>}
        {!loading ?
          <Link href={`/subreddit/${topic}`}>
              <div className="cursor-pointer rounded-full bg-blue-500 px-3 text-white">
                  View
              </div>
          </Link> : 
          <div className="cursor-pointer rounded-full bg-gray-500 px-3 text-white">
            View
          </div>
        }
    </div>
  )
}

export default SubredditRow