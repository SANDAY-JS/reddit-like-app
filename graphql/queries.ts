import { gql } from '@apollo/client'

export const GET_POST_BY_POST_ID = gql`
query MyQuery($post_id: ID!) {
  getPostByPostId(post_id: $post_id) {
    created_at
    id
    body
    title
    username
    image
    subreddit_id
    comments {
      created_at
      id
      post_id
      text
      username
    }
    subreddit {
      id
      topic
      created_at
    }
    votes {
      id
      upvote
      username
      created_at
      post_id
    }
  }
}`

export const GET_SUBREDDIT_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getSubredditListByTopic(topic: $topic) {
      created_at
      id
      topic
    }
  }
`

export const GET_ALL_POSTS = gql`
  query MyQuery {
    getPostList {
      created_at
      id
      body
      title
      username
      image
      subreddit_id
      comments {
        created_at
        id
        post_id
        text
        username
      }
      subreddit {
        id
        topic
        created_at
      }
      votes {
        id
        upvote
        username
        created_at
        post_id
      }
    }
  }
`

export const GET_ALL_POSTS_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getPostListByTopic(topic: $topic) {
      created_at
      id
      body
      title
      username
      image
      subreddit_id
      votes {
        id
        upvote
        username
        created_at
        post_id
      }
      comments {
        created_at
        id
        post_id
        text
        username
      }
      subreddit {
        id
        topic
        created_at
      }
    }
  }
`
