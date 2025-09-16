export class Movie {
  constructor(data) {
    this.backdropPath = data.backdrop_path
    this.id = data.id
    this.originalLanguage = data.original_language
    this.originalTitle = data.original_title
    this.overview = data.overview
    this.popularity = data.popularity
    this.posterPath = data.poster_path
    this.releaseDate = new Date(data.release_date)
    this.title = data.title
    this.voteAverage = data.vote_average
    this.voteCount = data.vote_count
  }


  get backdropImgUrl() {
    return 'https://image.tmdb.org/t/p/w500/' + this.backdropPath
  }
  get backdropImgUrlHD() {
    return 'https://image.tmdb.org/t/p/original/' + this.backdropPath
  }
  get posterImgUrl() {
    return 'https://image.tmdb.org/t/p/w500/' + this.posterPath
  }
  get posterImgUrlHD() {
    return 'https://image.tmdb.org/t/p/original/' + this.posterPath
  }
}