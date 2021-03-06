import React, { useState } from 'react'
import {useSession} from 'next-auth/react';
import Avatar from './Avatar';
import {LinkIcon, PhotographIcon} from '@heroicons/react/outline';
import {useForm} from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { ADD_POST, ADD_SUBREDDIT } from '../graphql/mutations';
import client from '../apollo-client';
import { GET_ALL_POSTS, GET_SUBREDDIT_BY_TOPIC } from '../graphql/queries';
import toast from 'react-hot-toast';

type FormData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
}

type Props = {
  subreddit?: string;
}

function PostBox({subreddit}: Props) {
    const {data: session} = useSession()
    const [addPost] = useMutation(ADD_POST, {refetchQueries: [GET_ALL_POSTS, 'getPostList']})
    const [addSubreddit] = useMutation(ADD_SUBREDDIT) 

    const [imageBoxOpen, setImageBoxOpen] = useState<boolean>()
    const {register, setValue, handleSubmit, watch, formState: {errors}} = useForm<FormData>()

    const onSubmit = handleSubmit(async(formData) => {
      const notification = toast.loading('Creating new Post...')

      try {
        // quesry for the subreddit topic
        const {data: {getSubredditListByTopic}} = 
          await client.query({
            query: GET_SUBREDDIT_BY_TOPIC,
            variables: {
              topic: subreddit || formData.subreddit
            }
          })

          const subredditExists = getSubredditListByTopic.length > 0;

          if(!subredditExists) {
            // create subreddit
            console.log('createing a subreddit')
            const {data: { insertSubreddit: newSubreddit }} = 
              await addSubreddit({
                variables: {
                  topic: formData.subreddit
                }
              });

            console.log('Creating a post...', formData)
            const image = formData.postImage || '';

            const {data: {insertPost: newPost}} = 
              await addPost({
                variables: {
                  body: formData.postBody,
                  image: image,
                  subreddit_id: newSubreddit.id,
                  title: formData.postTitle,
                  username: session?.user?.name,
                }
              })

            console.log('new post added: ', newPost)
          } else {
            // use existing subreddit
            console.log('using existing subreddit')
            console.log(getSubredditListByTopic)

            const image = formData.postImage || '';
            const {data: {insertPost: newPost}} = 
              await addPost({
                variables: {
                  body: formData.postBody,
                  image: image,
                  subreddit_id: getSubredditListByTopic[0].id,
                  title: formData.postTitle,
                  username: session?.user?.name,
                }
              })

            console.log('new post added', newPost)
          }


          // After the post has been added
          setValue('postBody', '')
          setValue('postImage', '')
          setValue('postTitle', '')
          setValue('subreddit', '')

          toast.success('New Post Created!', {
            id: notification
          })
      } catch (error) {
        toast.error('Something went wrong...', {
          id: notification
        })
        console.error(error)
      }
    })
    

  return (
    <form onSubmit={onSubmit} className='sticky top-16 z-40 rounded-md border border-gray-300 bg-white p-2'>
        <div className='flex items-center space-x-3 overflow-hidden'>
            <Avatar />

            <input 
              {...register('postTitle', {required: true})}
                type="text" 
                disabled={!session}
                className='p-2 pl-5 bg-gray-50 outline-none rounded-md flex-1' 
                placeholder={
                  session ? subreddit ? `Create a post in r/${subreddit}` : 'Create a post by entering a title!' : 'Sign in to post'
                }
            />

            <PhotographIcon onClick={() => setImageBoxOpen(!imageBoxOpen)} className={`h-6 text-gray-300 cursor-pointer ${imageBoxOpen && 'text-blue-300'}`} />
            <LinkIcon className={`h-6 text-gray-300 cursor-pointer`} />
        </div>

        {!!watch('postTitle') && (
          <div className='flex flex-col py-2'>
            <div className='flex items-center px-2'>
              <p>Body:</p>
              <input 
                {...register('postBody')} 
                type="text" 
                className='m-2 flex-1 bg-blue-50 p-2 outline-none'
                placeholder='Text (optional)' 
              />
            </div>

          {!subreddit && (
            <div className='flex items-center px-2'>
              <p>Subreddit:</p>
              <input 
                {...register('subreddit', {required: true})} 
                type="text" 
                className='m-2 flex-1 bg-blue-50 p-2 outline-none'
                placeholder={'i.e. Programming'}
              />
            </div>
          )}

            {imageBoxOpen && (
              <div className='flex items-center px-2'>
                <p>Image URL:</p>
                <input 
                  {...register('postImage')} 
                  type="text" 
                  className='m-2 flex-1 bg-blue-50 p-2 outline-none'
                  placeholder='optional' 
                />
              </div>
            )}

            {/* Errors */}
            {Object.keys(errors).length > 0 && (
              <div className='text-red-400 my-2 ml-2'>
                {errors.postTitle?.type === 'required' && (
                  <p>- A Post Title is required</p>
                )}

                {errors.subreddit?.type === 'required' && (
                  <p>- A Subreddit is required</p>
                )}
              </div>
            )}

            {!!watch('postTitle') && (
              <button type='submit' className='rounded-full w-full bg-blue-400 text-white p-2'>
                Create Post
              </button>
            )}
          </div>
        )}
    </form>
  )
}

export default PostBox