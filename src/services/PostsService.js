import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";
import { api } from "./AxiosService.js"



class PostsService {
  async getPosts() {
    const response = await api.get('api/posts')
    // console.log('🅿️', response.data);
    const posts = response.data.posts.map(posts => new Post(posts))
    AppState.posts = posts
    // console.log(posts);
  }

  async getPosts2(url) {
    const response = await api.get(url)
    const posts = response.data.posts.map(postData => new Post(postData))
    AppState.posts = posts
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.totalPages
  }

  async changePage(pageNumber) {
    const response = await api.get(`api/posts?=${pageNumber}`)
    // console.log('page turn', response.data)
    const posts = response.data.posts.map(postData => new Post(postData))
    AppState.posts = posts
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.totalPages
  }

  async getProfilePosts(profileId) {
    AppState.profilePosts = []
    const response = await api.get(`api/posts?creatorId=${profileId}`)
    // console.log('posts by profile', response.data);
    const posts = response.data.posts.map(posts => new Post(posts))
    AppState.profilePosts = posts
  }

  async searchPosts(searchQuery) {
    const response = await api.get(`api/posts?query=${searchQuery}`)
    // console.log('Found post', response.data);
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

  async createPost(postData) {
    const response = await api.post('api/posts', postData)
    // console.log("Created Post", response.data);
    const newPost = new Post(response.data)
    AppState.posts.unshift(newPost)
  }
}

export const postsService = new PostsService()