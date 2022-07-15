import React from 'react'
import {useSession} from 'next-auth/react';
import Avatar from './Avatar';

function PostBox() {
    const {data: session} = useSession()

  return (
    <form className='sticky'>
        <div className='flex items-center space-x-3 overflow-hidden'>
            <Avatar />

            <input 
                type="text" 
                disabled={!session}
                className='p-2 pl-5 bg-gray-50 outline-none rounded-md flex-1' 
                placeholder={session ? 'Create a post by entering a title!' : 'Sign in to post'} />
        </div>
    </form>
  )
}

export default PostBox