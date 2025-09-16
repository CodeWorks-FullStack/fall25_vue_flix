<script setup>
import { moviesService } from '@/services/MoviesService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

// NOTE current route information
const route = useRoute()

onMounted(() => {
  getMovieById()
})

async function getMovieById() {
  try {
    const movieId = route.params.movieId
    logger.log('Getting my by id!', movieId);
    await moviesService.getMovieById(movieId)
  } catch (error) {
    Pop.error(error)
    logger.error('COULD NOT GET MOVIE', error)
  }
}
</script>


<template>
  <h1>Movie Details</h1>
</template>


<style lang="scss" scoped></style>