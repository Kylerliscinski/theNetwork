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
