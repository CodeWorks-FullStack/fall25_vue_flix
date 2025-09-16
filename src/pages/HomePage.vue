<script setup>
import { moviesService } from '@/services/MoviesService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { onMounted, onUnmounted } from 'vue';

// NOTE lifecycle hook
onMounted(() => {
  logger.log('Home page is mounted!')
  discoverMovies()
})

onUnmounted(() => {
  logger.log('Home page is unmounted!')
})

async function discoverMovies() {
  try {
    await moviesService.discoverMovies()
  } catch (error) {
    Pop.error(error)
    // NOTE logger is very similar to console
    logger.error('COULD NOT GET MOVIES', error)
  }
}

</script>

<template>
  movies
</template>

<style scoped lang="scss"></style>
