import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";
import { api } from "./AxiosService.js"



class PostsService {
  async getPosts() {
    const response = await api.get('api/posts')
    console.log('🅿️', response.data);
    const posts = response.data.posts.map(posts => new Post(posts))
    AppState.posts = posts
    console.log(posts);
  }
}

export const postsService = new PostsService()