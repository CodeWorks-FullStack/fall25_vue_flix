<script setup>
import { moviesService } from '@/services/MoviesService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { ref } from 'vue';

// NOTE refs can be instantiated with primitives
const editableSearchTerm = ref('')

async function searchMovies() {
  try {
    logger.log('Searching for ' + editableSearchTerm.value)
    await moviesService.searchMovies(editableSearchTerm.value)
    editableSearchTerm.value = '' // clears form
  } catch (error) {
    Pop.error(error)
    logger.error('COULD NOT SEARCH', error)
  }
}

</script>


<template>
  <!-- .prevent calls event.preventDefault() -->
  <form @submit.prevent="searchMovies()">
    <label for="search-bar">Search for a movie by title</label>
    <div class="d-flex">
      <!-- NOTE v-model sets up 2-way data-binding between this input and our ref -->
      <input v-model="editableSearchTerm" id="search-bar" type="text" class="form-control">
      <button class="btn btn-vue" type="submit">
        <span class="mdi mdi-magnify"></span>
      </button>
    </div>
  </form>
</template>


<style lang="scss" scoped>
label {
  display: block;
}
</style>