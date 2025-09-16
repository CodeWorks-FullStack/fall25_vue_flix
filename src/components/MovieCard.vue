<!-- NOTE 'vt:basic' code snippet will give a starting VUE component file -->

<script setup>
import { Movie } from '@/models/Movie.js';

// NOTE props allow a parent component (HomePage) to pass values to a child component (MovieCard)
// REVIEW props are essentially parameters for our components
defineProps({
  movieProp: { type: Movie, required: true },
  // coolName: { type: String }
})
</script>


<template>
  <!-- REVIEW CODE SMALL TEST SMALL WITH ROUTER LINKS -->
  <!-- NOTE the 'to' prop for a router-link should be an object that is formatted to specify where this router link navigates to (name) and any parameters that are required for the route (params). The name of your param is defined in the router: ('movie/:movieId') -->
  <RouterLink :to="{ name: 'Movie Details', params: { movieId: movieProp.id } }">
    <div>
      <img :src="movieProp.posterImgUrl" :alt="`Movie poster for ${movieProp.title}`"
        class="img-fluid rounded shadow-lg">
      <b class="d-block">{{ movieProp.title }}</b>
      <time :datetime="movieProp.releaseDate.toLocaleDateString()"
        :title="`${movieProp.title} releases on ${movieProp.releaseDate.toLocaleDateString()}`">
        {{ movieProp.releaseDate.toLocaleDateString() }}
      </time>
    </div>
  </RouterLink>
</template>


<style lang="scss" scoped>
a {
  text-decoration: none;
  color: unset;
}

a:hover {
  text-decoration: underline;
}
</style>