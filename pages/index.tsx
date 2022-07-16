import type { NextPage } from 'next'
import Head from 'next/head'
import PostBox from '../components/PostBox'

const Home: NextPage = () => {
  return (
    <div className="max-w-5xl mt-7 mx-auto">
      <Head>
        <title>Reddit Like App</title>
      </Head>

      {/* Posts Box */}
      <PostBox />

      {/* Feed */}
      <div className='flex'></div>
    </div>
  )
}

export default Home
