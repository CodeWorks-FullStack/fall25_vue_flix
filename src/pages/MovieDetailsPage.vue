<script setup>
import { AppState } from '@/AppState.js';
import { moviesService } from '@/services/MoviesService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const movie = computed(() => AppState.activeMovie)

// NOTE current route information
const route = useRoute()

onMounted(() => {
  getMovieById()
})

async function getMovieById() {
  try {
    const movieId = route.params.movieId
    logger.log('Getting movie by id!', movieId);
    await moviesService.getMovieById(movieId)
  } catch (error) {
    Pop.error(error)
    logger.error('COULD NOT GET MOVIE', error)
  }
}
</script>


<template>
  <!-- NOTE only render this HTML if there is a movie in the appstate! -->
  <div v-if="movie" class="container">
    <div class="row">
      <div class="col-12">
        <h1>{{ movie.title }}</h1>
        <p>{{ movie.overview }}</p>
        <img :src="movie.posterImgUrlHD" :alt="'Poster for ' + movie.title" class="img-fluid w-100">
      </div>
    </div>
  </div>
  <div v-else class="container">
    <div class="row">
      <div class="col-12">
        <h1>Loading...</h1>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>