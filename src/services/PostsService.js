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
  async searchPosts(searchQuery) {
    const response = await api.get(`search/posts?query=${searchQuery}`)
    console.log('Found posts', response.data);
    const posts = response.data.posts.map(postData => new Post(postData))
    AppState.searchTerm = searchQuery
    AppState.posts = posts
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.totalPages
  }
  async clearSearch() {
    AppState.searchTerm = ''
    await this.getPosts()
  }
}

export const postsService = new PostsService()