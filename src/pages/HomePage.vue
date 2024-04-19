<script setup>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js";
import PostCard from "../components/PostCard.vue";


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
 The Network!
<section class="container">
  <div v-for="post in posts" :key="post.id" class="col-6">
    <PostCard />
  </div>
</section>
</template>

<style scoped lang="scss">

</style>
