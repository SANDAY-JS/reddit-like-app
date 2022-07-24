import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  GiftIcon,
  ShareIcon,
} from '@heroicons/react/solid'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Avatar from './Avatar'
import TimeAgo from 'timeago-react'
import { Jelly } from '@uiball/loaders'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { useMutation, useQuery } from '@apollo/client'
import { GET_ALL_VOTES_BY_POST_ID } from '../graphql/queries'
import { ADD_VOTE, DELETE_VOTE } from '../graphql/mutations'
import PostShadow from './skeleton/PostShadow'

type Props = {
    post: Post;
}

function Post({post}: Props) {
  const [vote, setVote] = useState<boolean>()
  const {data: session} = useSession()

  const {data, loading} = useQuery(GET_ALL_VOTES_BY_POST_ID, {
    variables: { post_id: post?.id }
  })

  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_ALL_VOTES_BY_POST_ID, 'getVotesByPostId']
  })
  const [deleteVote] = useMutation(DELETE_VOTE, {
    refetchQueries: [GET_ALL_VOTES_BY_POST_ID, 'getVotesByPostId']
  })

  const upVote = async (isUpvote: boolean) => {
    if(!session) {
      toast("You'll need to sign in to vote!")
      return;
    }

    if(vote && isUpvote) return;
    if(vote === false && !isUpvote) return;
    console.log('VOTING')

    try {
      if(vote) {
        await deleteVote({})
      }
      await addVote({
        variables: {
          post_id: post.id,
          username: session.user?.name,
          upvote: isUpvote
        }
      })
      console.log('VOTED')
    } catch (error) {
      console.log(error)
    }
  }

  const displayVotes = (data: any) => {
    const votes: Vote[] = data?.getVotesByPostId;
    const displayNumber = votes?.reduce((total, vote) => vote.upvote ? total += 1 : total -= 1, 0)

    if(votes?.length === 0) return 0;
    if(displayNumber === 0) return votes[0]?.upvote ? 1 : -1;

    return displayNumber;
  }

  useEffect(() => {
    const votes: Vote[] = data?.getVotesByPostId;

    const findVotes = votes?.find(vote => vote.username === session?.user?.name);
    const vote = findVotes?.upvote
    setVote(vote)

    // if(!findVotes) return;
    // setHasVotedTo(vote ? true : false)
  }, [data])

  if(!post) 
    return (
      <PostShadow />
    )

  return (
    <Link href={`/post/${post.id}`}>
      <div className='flex cursor-pointer rounded-md border border-gray-300 bg-white shadow-sm hover:border-gray-600'>
          {/* Votes */}
          <div className='flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400'>
              <ArrowUpIcon onClick={() => upVote(true)} className={`voteButtons hover:text-red-400 cursor-pointer ${vote && 'text-red-400'}`} />
              <p className='text-black font-bold text-xs'>{displayVotes(data)}</p>
              <ArrowDownIcon onClick={() => upVote(false)} className={`voteButtons hover:text-blue-400 cursor-pointer ${vote === false && 'text-blue-400'}`} />
          </div>

          <div className='p-3 pb-1'>
              {/* Header */}
              <div className='flex items-center space-x-2'>
                <Avatar seed={post.subreddit[0].topic} />
                <p className='text-xs text-gray-400'>
                  <Link href={`/subreddit/${post.subreddit[0]?.topic}`}>
                    <span className='font-bold text-black hover:text-blue-400 hover:underline'>
                      r/{post.subreddit[0]?.topic}
                    </span>
                  </Link>
                  {' '}・Posted by u/{post.username}{' '}
                  <TimeAgo datetime={post.created_at} />
                </p>
              </div>

              {/* Body */}
              <div className="py-4">
                <h2 className='text-xl font-semibold'>{post.title}</h2>
                <p className="mt-2 text-sm font-light">{post.body}</p>
              </div>

              {/* Image */}
              <img className='w-full' src={post.image} alt="" />

              {/* Footer */}
              <div className="flex space-x-4 text-gray-400">
                <div className='postButtons'>
                  <ChatIcon className='h-6 w-6' />
                  <p>{post.comments.length} Comments</p>
                </div>
                <div className='postButtons'>
                  <GiftIcon className='h-6 w-6' />
                  <p className='hidden sm:inline'>{post.comments.length} Award</p>
                </div>
                <div className='postButtons'>
                  <ShareIcon className='h-6 w-6' />
                  <p className='hidden sm:inline'>{post.comments.length} Share</p>
                </div>
                <div className='postButtons'>
                  <BookmarkIcon className='h-6 w-6' />
                  <p className='hidden sm:inline'>{post.comments.length} Save</p>
                </div>
                <div className='postButtons'>
                  <DotsHorizontalIcon className='h-6 w-6' />
                </div>
              </div>
          </div>
      </div>
    </Link>
  )
}

export default Post