import { gql } from '@apollo/client'

export const ADD_POST = gql`
  mutation MyMutation(
    $body: String!
    $title: String!
    $image: String!
    $username: String!
    $subreddit_id: ID!
  ) {
    insertPost(
      body: $body
      image: $image
      title: $title
      username: $username
      subreddit_id: $subreddit_id
    ) {
      id
      body
      image
      title
      username
      subreddit_id
    }
  }
`

export const ADD_SUBREDDIT = gql`
  mutation MyMutation($topic: String!) {
    insertSubreddit(topic: $topic) {
      id
      topic
      created_at
    }
  }
`

export const ADD_VOTE = gql`
  mutation MyMutation($post_id: ID!, $username: String!, $upvote: Boolean!) {
    insertVote(post_id: $post_id, username: $username, upvote: $upvote) {
      id
      created_at
      post_id
      upvote
      username
    }
  }
`

export const ADD_COMMENT = gql`
mutation MyMutation($post_id: ID!, $username: String!, $text: String!) {
  insertComment(post_id: $post_id, text: $text, username: $username) {
    created_at
    id
    post_id
    text
    username
  }
}
`
