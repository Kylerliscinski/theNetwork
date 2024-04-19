import { AppState } from "../AppState.js"
import { Profile } from "../models/Profile.js";
import { api } from "./AxiosService.js";



class ProfilesService {
  async getProfile(profileId) {
    AppState.activeProfile = null
    const response = await api.get(`api/profiles/${profileId}`)
    console.log('🙍', response.data);
    AppState.activeProfile = response.data
  }

  async searchProfiles(searchQuery) {
    const response = await api.get(`api/profiles?query=${searchQuery}`)
    console.log('Found profile', response.data);
    const profile = response.data.map(profileData => new Profile(profileData))
    AppState.searchTerm = searchQuery
    AppState.posts = profile
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.totalPages
  }
  async clearSearch() {
    AppState.searchTerm = ''
    await this.getProfile()
  }
}

export const profilesService = new ProfilesService()