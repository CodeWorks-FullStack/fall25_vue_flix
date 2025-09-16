// NOTE most of our service layer will look the same as an MVC template service layer

import { AppState } from "@/AppState.js"
import { Movie } from "@/models/Movie.js"
import { logger } from "@/utils/Logger.js"
import axios from "axios"

const movieApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  timeout: 3000,
  params: {
    api_key: '545c6ef058e65396849dfbbf381cbca3', // => api_key=545c6ef058e65396849dfbbf381cbca3
    'certification.gte': 'G',
    'certification.lte': 'R',
    certification_country: 'US',
    region: 'US',
    include_adult: false
  }
})

class MoviesService {

  async discoverMovies() {
    const response = await movieApi.get('discover/movie')
    logger.log('GOT MOVIES 🎥🎞️🍿', response.data)
    // logger.log('movies!', movies)
    this.handleMoviesResponse(response)
  }

  async changeDiscoverPage(pageNumber) {
    const response = await movieApi.get(`discover/movie?page=${pageNumber}`)
    logger.log('GOT DIFFERENT PAGE OF MOVIES 📖🎥🎞️🍿', response.data)
    // logger.log('movies!', movies)
    this.handleMoviesResponse(response)
  }

  handleMoviesResponse(response) {
    const movies = response.data.results.map(pojo => new Movie(pojo))
    AppState.movies = movies
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.total_pages > 500 ? 500 : response.data.total_pages
  }
}

export const moviesService = new MoviesService()