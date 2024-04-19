import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js";



class ProfilesService {
  async getProfile(profileId) {
    AppState.activeProfile = null
    const response = await api.get(`api/profiles/${profileId}`)
    console.log('🙍', response.data);
  }
}

export const profilesService = new ProfilesService()