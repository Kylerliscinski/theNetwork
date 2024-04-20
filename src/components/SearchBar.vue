<script setup>
import { computed, ref } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js";
import { logger } from "../utils/Logger.js";


const searchQuery = ref('')

const searchTerm = computed(() => AppState.searchTerm)

async function searchPosts(){
  try {
    logger.log("Searching", searchQuery.value);
    await postsService.searchPosts(searchQuery.value)
    searchQuery.value = ''
  } catch (error) {
    Pop.toast("Could not find post", 'error')
    logger.error(error)
  }
}

async function clearSearch(){
  try {
    await postsService.clearSearch()
  } catch (error) {
    Pop.toast("Could not clear search", 'error')
    logger.error(error)
  }
}
</script>


<template>
  <form @submit.prevent="searchPosts()">
    <div class="input-group">
      <input v-model="searchQuery" type="text" class="form-control" placeholder="type in keywords to find posts..." id="search-input">
      <button class="btn btn-success w-25">search <i class="mdi mdi-magnify"></i></button>
    </div>
  </form>
  <div v-if="searchTerm" class="mt-1">
    <div @click="clearSearch()" role="button" class="btn btn-outline-success" title="clear search results">{{ searchTerm }} <i class="mdi mdi-close"></i></div>
  </div>
</template>


<style lang="scss" scoped>

</style>