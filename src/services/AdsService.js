import { AppState } from "../AppState.js";
import { Ad } from "../models/Ad.js";
import { api } from "./AxiosService.js"



class AdsService {
  async getAds() {
    const response = await api.get('api/ads')
    // console.log('Got some ads', response.data);
    const ads = response.data.map(ads => new Ad(ads))
    AppState.ads = ads
  }
}

export const adsService = new AdsService()