import type { NextPage } from 'next'
import Head from 'next/head'
import PostBox from '../components/PostBox'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Reddit Like App</title>
      </Head>

      {/* Posts Box */}
      <PostBox />

      {/* Feed */}
      <div></div>
    </div>
  )
}

export default Home
