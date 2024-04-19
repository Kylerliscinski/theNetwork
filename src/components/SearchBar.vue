<script setup>
import { computed, ref } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { profilesService } from "../services/ProfilesService.js";


const searchQuery = ref('')

const searchTerm = computed(() => AppState.searchTerm)

async function searchProfiles(){
  try {
    console.log("Searching", searchQuery.value);
    await profilesService.searchProfiles(searchQuery.value)
    searchQuery.value = ''
  } catch (error) {
    Pop.toast("Could not find profile", 'error')
    console.error(error)
  }
}

async function clearSearch(){
  try {
    await profilesService.clearSearch()
  } catch (error) {
    Pop.toast("Could not clear search", 'error')
    console.error(error)
  }
}

</script>


<template>
  <form @submit.prevent="searchProfiles()">
    <div class="input-group">
      <input v-model="searchQuery" type="text" class="form-control" placeholder="Search for profiles..." id="search-input">
      <button class="btn btn-success w-25">search <i class="mdi mdi-magnify"></i></button>
    </div>
  </form>
  <div v-if="searchTerm" class="mt-1">
    <div @click="clearSearch" role="button" class="btn btn-outline-success" title="clear search results">{{ searchTerm }} <i class="mdi mdi-close"></i></div>
  </div>
</template>


<style lang="scss" scoped>

</style>