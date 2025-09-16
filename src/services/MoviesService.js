// NOTE most of our service layer will look the same as an MVC template service layer

import { logger } from "@/utils/Logger.js"
import axios from "axios"

const movieApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  timeout: 3000
})

class MoviesService {
  async discoverMovies() {
    const response = await movieApi.get('discover/movie?api_key=545c6ef058e65396849dfbbf381cbca3')
    logger.log('GOT MOVIES 🎥🎞️🍿', response.data)
  }
}

export const moviesService = new MoviesService()