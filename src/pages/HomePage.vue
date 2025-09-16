<script setup>
import { AppState } from '@/AppState.js';
import MovieCard from '@/components/MovieCard.vue';
import { moviesService } from '@/services/MoviesService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted, onUnmounted } from 'vue';

// NOTE computed returns a watchable object, and vue will re-render any HTML that uses the computed when it changes
const movies = computed(() => AppState.movies)
const currentPage = computed(() => AppState.currentPage)
const totalPages = computed(() => AppState.totalPages)

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

async function changePage(pageNumber) {
  try {
    logger.log('Changing page to ' + pageNumber)
    await moviesService.changeDiscoverPage(pageNumber)
  } catch (error) {
    Pop.error(error)
    logger.error('COULD NOT CHANGE PAGE', error)
  }
}

</script>

<template>
  <section class="container">
    <div class="row">
      <div class="col-12">
        <h1>Movies</h1>
        <div class="d-flex gap-4 align-items-center my-3">
          <button @click="changePage(currentPage - 1)" class="btn btn-vue" type="button" :disabled="currentPage < 2">
            Previous Page
          </button>
          <b>
            Page {{ currentPage }} of {{ totalPages }}
          </b>
          <button @click="changePage(currentPage + 1)" class="btn btn-vue" type="button"
            :disabled="currentPage == totalPages">
            Next Page
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <!-- NOTE pick a unique value from the data you are accessing for the key -->
      <div v-for="movie in movies" :key="movie.id" class="col-md-3 mb-3">
        <!-- <MovieCard :movieProp="{ title: 'Die Hard' }" /> -->
        <!-- NOTE movie becomes the argument for the movieProp -->
        <MovieCard :movieProp="movie" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
