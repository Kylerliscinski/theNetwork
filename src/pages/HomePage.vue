<script setup>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js";
import PostCard from "../components/PostCard.vue";
import Sidebar from "../components/Sidebar.vue";
import Searchbar from "../components/SearchBar.vue";

const posts = computed(() => AppState.posts)

async function getPosts(){
  try {
    await postsService.getPosts()
  } catch (error) {
    Pop.toast("Could not get Posts", 'error')
    console.error(error)
  }
}

async function changePage(pageNumber){
  try {
    await postsService.getPosts2(`api/posts?page=${pageNumber}`)
  } catch (error) {
    Pop.toast("Could not change page", 'error')
    console.error(error)
  }
  scroll(0,0)
}

async function changeSearchPage(pageNumber){
  try {
    await postsService.getPosts2(`api/posts?page=${pageNumber}&query=${AppState.searchTerm}`)
  } catch (error) {
    Pop.toast("Could not change the search page", 'error')
    console.error(error)
  }
}

onMounted(() => {
  getPosts()
})

</script>

<template>
<section class="container-fluid">
  <div class="row">
  
    <div class="col-3">
      <Sidebar/>
    </div>

    <div class="col-6">
      <div class="mt-2">
        <Searchbar/>
      </div>
      <div v-for="post in posts" :key="post.id" class="col-12 my-2">
        <PostCard :post="post"/>
      </div>
      <section v-if="!AppState.searchTerm" class="row my-3">
        <div class="col-4">
          <button :disabled="AppState.currentPage == 1" class="btn btn-success w-100" @click="changePage(AppState.currentPage - 1)" >Previous Page</button>
        </div>
        <div class="col-4 text-center">Page {{ AppState.currentPage }} of {{ AppState.totalPages }}</div>
        <div class="col-4">
          <button :disabled="AppState.currentPage == AppState.totalPages" class="btn btn-success w-100" @click="changePage(AppState.currentPage + 1)">Next Page</button>
        </div>
      </section>

      <section v-else class="row my-3">
        <div class="col-4">
          <button :disabled="AppState.currentPage == 1" class="btn btn-info w-100" @click="changeSearchPage(AppState.currentPage - 1)" >Previous Page</button>
        </div>
        <div class="col-4 text-center">Page{{ AppState.currentPage }} of {{ AppState.totalPages }}</div>
        <div class="col-4">
          <button :disabled="AppState.currentPage == AppState.totalPages" class="btn btn-info w-100" @click="changeSearchPage(AppState.currentPage + 1)">Next Page</button>
        </div>
      </section>
    </div>

    <div class="col-3">
      <div class="card">
        <div class="card-header">
          <h4>Hello</h4>
        </div>
      </div>
    </div>

  </div>
</section>
  
</template>

<style scoped lang="scss">

</style>
