import { useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import Head from 'next/head'
import Feed from '../components/Feed'
import PostBox from '../components/PostBox'
import SubredditRow from '../components/SubredditRow'
import { GET_SUBREDDITS_WITH_LIMIT } from '../graphql/queries'

const Home: NextPage = () => {
  const { data, loading } = useQuery(GET_SUBREDDITS_WITH_LIMIT, {
    variables: {
      limit: 10,
    },
  })
  const subreddits: Subreddit[] = data?.getSubredditListLimit

  return (
    <div className="max-w-5xl my-7 mx-auto w-[95%] sm:w-auto">
      <Head>
        <title>Reddit Like App</title>
        <link rel="shortcut icon" href="/images/reddit-face.jpeg" type="image/x-icon" />
      </Head>

      <PostBox />

      <div className='flex'>
        <Feed />

        <div className='sticky top-36 mx-5 mt-5 hidden h-fit max-w-[300px] rounded-md border border-gray-300 bg-white lg:inline'>
          <p className='text-md mb-1 p-4 pb-3 font-bold'>Top Communities</p>

          <div>
            {!loading ? subreddits?.map((subreddit, i) => (
              <SubredditRow key={subreddit.id} topic={subreddit.topic} index={i} />
            )) : Array(10).fill('').map((_,i) => <SubredditRow key={i} topic={''} index={i} loading={loading}/>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
