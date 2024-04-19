<script setup>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { postsService } from "../services/PostsService.js";


const posts = computed(() => AppState.posts)

async function getPosts(){
  try {
    await postsService.getPosts()
  } catch (error) {
    Pop.toast("Could not get Posts", 'error')
    console.error(error)
  }
}

onMounted(() => getPosts())

</script>

<template>
 The Network!
 {{ posts }}
</template>

<style scoped lang="scss">

</style>
