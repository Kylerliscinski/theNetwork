import { AppState } from "../AppState.js";
import { Post } from "../models/Post.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js"


class PostsService {
  async getPosts() {
    const response = await api.get('api/posts')
    logger.log('🅿️', response.data);
    const posts = response.data.posts.map(posts => new Post(posts))
    AppState.posts = posts
    logger.log(posts);
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
    logger.log('page turn', response.data)
    const posts = response.data.posts.map(postData => new Post(postData))
    AppState.posts = posts
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.totalPages
  }

  async getProfilePosts(profileId) {
    AppState.profilePosts = []
    const response = await api.get(`api/posts?creatorId=${profileId}`)
    logger.log('posts by profile', response.data);
    const posts = response.data.posts.map(posts => new Post(posts))
    AppState.profilePosts = posts
  }

  async searchPosts(searchQuery) {
    AppState.posts = []
    const response = await api.get(`api/posts?query=${searchQuery}`)
    logger.log('Found post', response.data);
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
    logger.log("Created Post", response.data);
    const newPost = new Post(response.data)
    AppState.posts.unshift(newPost)
  }

  async destroyPost(postId) {
    const response = await api.delete(`api/posts/${postId}`)
    logger.log("destroyed post", response.data)
    const posts = AppState.posts
    const postIndex = posts.findIndex(post => post.id == postId)
    if (postIndex == -1) throw new Error("You could not find the index")
    posts.splice(postIndex, 1)
  }

  async likePost(postId) {
    const response = await api.post(`api/posts/${postId}/like`)
    logger.log("liked post", response.data)
    await this.getPosts()
  }
}

export const postsService = new PostsService()