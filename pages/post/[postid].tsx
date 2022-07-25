import React from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import TimeAgo from 'timeago-react';
import Avatar from '../../components/Avatar';
import Post from '../../components/Post';
import { ADD_COMMENT } from '../../graphql/mutations';
import { GET_POST_BY_POST_ID } from '../../graphql/queries';

type FormData = {
  comment: string
}

function PostPage() {
  const router = useRouter()
  const {data: session} = useSession()
  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_POST_BY_POST_ID, 'getPostByPostId']
  })
  const {data, error} = useQuery(GET_POST_BY_POST_ID, {
    variables: {post_id: router.query.postid}
  })
  const post: Post = data?.getPostByPostId;

  const {register, handleSubmit, watch, setValue, formState: {errors}} = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // Submit Comment
    const notification = toast.loading('Posting Your Comment...')

    try {
      await addComment({
        variables: {
          post_id: router.query.postid,
          username: session?.user?.name,
          text: data.comment
        }
      })
      setValue('comment', '')
      toast.success("Comment Posted!", {id: notification})
    } catch (error) {
      toast.error("Posting Failed.", {id: notification})
    }
  }

  return (
    <div className='mx-auto my-7 max-w-5xl w-[95%] sm:w-auto'>
        <Post post={post} />

        <div className='-mt-1 rounded-b-md border border-t-0 border-gray-300 bg-white p-5  pl-16'>
          <p className='text-sm'>
            Comment as <span className='text-green-500'>{session?.user?.name}</span>
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col max-w-5xl space-y-2'>
            <textarea 
              {...register('comment')}
              required
              disabled={!session}
              className='h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50' 
              placeholder={session ? 'What are your thoughts?' : 'Please Sign in to comment'}
              />
              <button disabled={!session} type="submit" className={`rounded-full p-3 text-white font-semibold hover:bg-gray-200 ${session ? 'bg-red-500' : 'bg-gray-200'}`}>
                Comment
              </button>
          </form>
        </div>

        <div className='-my-5 rounded-b-md border border-t-0 border-gray-300 bg-white py-5 px-10'>
          <hr className='py-2' />

          {post?.comments?.map((comment: any, i) => (
            <div key={i} className='relative flex items-center space-x-2 space-y-2'>
              <hr className='absolute top-10 h-16 border left-7 z-0' />
              <div className='z-50'>
                <Avatar seed={comment.username} />
              </div>

              <div className='flex flex-col'>
                <p className='py-2 text-xs text-gray-400'>
                  <span className='font-semibold text-gray-600'>{comment.username}</span>
                  {' '}
                  <TimeAgo datetime={comment.created_at} />
                </p>
                <p>{comment.text}</p>
              </div>
            </div>
          ))}
        </div>

    </div>
  )
}


// export const getStaticPaths: GetStaticPaths = async () => {
// 	// Call an external API endpoint to get posts
// 	const { data: getPostList } = await client.query({
// 		query: GET_ALL_POSTS,
// 	});

// 	// Get the paths we want to pre-render based on posts
// 	const paths = getPostList.getPostList.map((post: Post) => ({
// 		params: { postId: post.id },
// 	}));

// 	return { paths, fallback: "blocking" };
// };

// export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
//   console.log('Look>>',params?.postId)
// 	const { data } = await client.query({
// 		query: GET_POST_BY_POST_ID,
// 		variables: {
// 			post_id: params?.postId,
// 		},
// 	});

// 	return {
// 		props: {
// 			post: data.getPostByPostId as Post,
// 		},
// 	};
// };

export default PostPage