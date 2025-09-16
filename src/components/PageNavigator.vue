<script setup>
import { AppState } from '@/AppState.js'
import { moviesService } from '@/services/MoviesService.js'
import { logger } from '@/utils/Logger.js'
import { Pop } from '@/utils/Pop.js'
import { computed } from 'vue'

const currentPage = computed(() => AppState.currentPage)
const totalPages = computed(() => AppState.totalPages)

async function changePage(pageNumber) {
  try {
    logger.log('Changing page to ' + pageNumber)
    // if the user hasn't searched for something
    if (AppState.searchTerm == '') {
      await moviesService.changeDiscoverPage(pageNumber)
    }
    else {
      await moviesService.changeSearchPage(pageNumber, AppState.searchTerm)
    }
  } catch (error) {
    Pop.error(error)
    logger.error('COULD NOT CHANGE PAGE', error)
  }
}
</script>


<template>
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
</template>


<style lang="scss" scoped></style>