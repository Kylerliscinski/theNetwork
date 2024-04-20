<script setup>
import { computed, onMounted, ref } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js";
import PostCard from "../components/PostCard.vue";
import Sidebar from "../components/Sidebar.vue";
import Searchbar from "../components/SearchBar.vue";
import { adsService } from "../services/AdsService.js";
import AdCard from "../components/AdCard.vue";
import { logger } from "../utils/Logger.js";

const posts = computed(() => AppState.posts)
const account = computed(() => AppState.account)
const ads = computed(() => AppState.ads)

const editableData = ref({
  body: '',
  imgUrl: ''
})

async function getPosts(){
  try {
    await postsService.getPosts()
  } catch (error) {
    Pop.toast("Could not get Posts", 'error')
    logger.error(error)
  }
}

async function getAds(){
  try {
    await adsService.getAds()
  } catch (error) {
    Pop.toast("Could not get Ads", 'error')
    logger.error(error)
  }
}

async function changePage(pageNumber){
  try {
    await postsService.getPosts2(`api/posts?page=${pageNumber}`)
  } catch (error) {
    Pop.toast("Could not change page", 'error')
    logger.error(error)
  }
  scroll(0,0)
}

async function changeSearchPage(pageNumber){
  try {
    await postsService.getPosts2(`api/posts?page=${pageNumber}&query=${AppState.searchTerm}`)
  } catch (error) {
    Pop.toast("Could not change the search page", 'error')
    logger.error(error)
  }
}

async function createPost(){
  try {
    // logger.log("creating a post", editableData)
    await postsService.createPost(editableData.value)

    editableData.value = {
      body: '',
      imgUrl: ''
    }
  } catch (error) {
    Pop.toast("Could not create Post", 'error')
    logger.error(error)
  }
}

onMounted(() => {
  getPosts()
  getAds()
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

      <div class="card my-3">
        <form v-if="account" @submit.prevent="createPost()">
          <img class="profile m-1" :src="account.picture" alt="">
          <textarea v-model="editableData.body" placeholder="Share whats happening..." class="form-control" name="form" id="" cols="30" rows="5"></textarea>
          <input v-model="editableData.imgUrl" class="form-control" placeholder="Attach a photo here..." type="url">
          <button class="btn btn-success rounded-pill text-center w-25 float-end m-1">Post</button>
        </form>
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
        <div class="col-4 text-center">Page {{ AppState.currentPage }} of {{ AppState.totalPages }}</div>
        <div class="col-4">
          <button :disabled="AppState.currentPage == AppState.totalPages" class="btn btn-info w-100" @click="changeSearchPage(AppState.currentPage + 1)">Next Page</button>
        </div>
      </section>
    </div>

    <div class="col-3">
      <div v-for="ad in ads" :key="ad.id" class="col-12">
        <AdCard :ad="ad"/>
      </div>
    </div>

  </div>
</section>
  
</template>

<style scoped lang="scss">
.profile{
    height: 55px;
    aspect-ratio: 1/1;
    border-radius: 50em;
    object-fit: cover;
    object-position: center
  }
</style>
