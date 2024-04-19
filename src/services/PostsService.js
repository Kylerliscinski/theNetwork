import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";
import { api } from "./AxiosService.js"



class PostsService {
  async getPosts() {
    const response = await api.get('api/projects')
    console.log('🅿️', response.data);
    const posts = response.data.map(posts => new Post(posts))
    AppState.posts = posts
  }
}

export const postsService = new PostsService()