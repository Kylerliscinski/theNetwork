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

  async changePage(pageNumber) {
    const response = await api.get(`api/posts?=${pageNumber}`)
    console.log('page turn', response.data)
    const posts = response.data.posts.map(postData => new Post(postData))
    AppState.posts = posts
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.totalPages
  }

  async getProfilePosts(profileId) {
    AppState.profilePosts = []
    const response = await api.get(`api/posts?creatorId=${profileId}`)
    console.log('posts by profile', response.data);
    const posts = response.data.posts.map(posts => new Post(posts))
    AppState.profilePosts = posts
  }
}

export const postsService = new PostsService()