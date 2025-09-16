<script setup>
import { AppState } from '@/AppState.js';
import { moviesService } from '@/services/MoviesService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted, onUnmounted } from 'vue';

// NOTE computed returns a watchable object, and vue will re-render any HTML that uses the computed when it changes
const movies = computed(() => AppState.movies)

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
  <section class="container">
    <div class="row">
      <div class="col-12">
        <h1>Movies</h1>
      </div>
      <div class="col-12">
        {{ movies }}
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
