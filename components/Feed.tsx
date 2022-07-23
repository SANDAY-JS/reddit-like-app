import React from 'react'
import { useQuery } from '@apollo/client'
import Post from './Post'
import { GET_ALL_POSTS, GET_ALL_POSTS_BY_TOPIC } from '../graphql/queries'

type Props = {
  topic?: string
}

function Feed({topic}: Props) {
  const {data, loading, error} = 
    !topic ? useQuery(GET_ALL_POSTS) : 
    useQuery(GET_ALL_POSTS_BY_TOPIC, {variables: {topic: topic}})

  const posts: Post[] = !topic ? data?.getPostList : data?.getPostListByTopic;

  if(loading) {
    return <div className='mt-5 space-y-4 min-w-full sm:min-w-[400px] sm:flex-1 min-h-screen' />
  }

  return (
    <div className='mt-5 space-y-4 min-w-full sm:min-w-[400px] sm:flex-1'>
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}

export default Feed