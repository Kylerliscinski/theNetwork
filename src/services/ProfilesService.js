import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js";
import { Profile } from "../models/Profile.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";



class ProfilesService {
  async getProfile(profileId) {
    AppState.activeProfile = null
    const response = await api.get(`api/profiles/${profileId}`)
    logger.log('🙍', response.data);
    AppState.activeProfile = response.data
  }

  async changePagePerCreator(creatorId, pageNumber) {
    const response = await api.get(`api/posts?=${creatorId}&page=${pageNumber}`)
    logger.log('page turn', response.data)
    const posts = response.data.posts.map(postData => new Post(postData))
    AppState.posts = posts
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.totalPages
  }
}

export const profilesService = new ProfilesService()