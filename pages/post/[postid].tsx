import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import React from 'react'
import client from '../../apollo-client';
import Post from '../../components/Post';
import { GET_ALL_POSTS, GET_POST_BY_POST_ID } from '../../graphql/queries';

function PostPage({post}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className='mx-auto my-7 max-w-5xl'>
        <Post post={post} />
    </div>
  )
}


export const getStaticPaths: GetStaticPaths = async () => {
	// Call an external API endpoint to get posts
	const { data: getPostList } = await client.query({
		query: GET_ALL_POSTS,
	});

	// Get the paths we want to pre-render based on posts
	const paths = getPostList.getPostList.map((post: Post) => ({
		params: { postId: post.id },
	}));

	return { paths, fallback: "blocking" };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  console.log('Look>>',params?.postId)
	const { data } = await client.query({
		query: GET_POST_BY_POST_ID,
		variables: {
			id: params?.postId,
		},
	});

	return {
		props: {
			post: data.getPostByPostId as Post,
		},
	};
};

export default PostPage