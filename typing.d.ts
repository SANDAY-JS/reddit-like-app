type Post = {
    id: number
    body: string
    image: string
    title: string
    username: string
    subreddit_id: number
    created_at: string
    votes: Vote[]
    comments: Comment[]
    subreddit: Subreddit[]
}
  
type Comment = {
  id: number
  post_id: number
  text: string
  username: string
  created_at: string
}

type Vote = {
  id: number
  post_id: number
  upvote: boolean
  username: string
  created_at: string
}

type Subreddit = {
  created_at: string
  id: number
  topic: string
}