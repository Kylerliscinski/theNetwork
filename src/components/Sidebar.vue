<script setup>
import { computed } from "vue";
import { Post } from "../models/Post.js";
import { AppState } from "../AppState.js";

defineProps({post: {type: Post, required: true}})

const account = computed(() => AppState.account)


</script>


<template>
  <!-- //FIXME - Fix this error -->
  <div v-if="account" class="card row text-center sticky-top">
    <div class="card-header">
      <h5 class="text-center my-3">Hello! {{ account.name }}</h5>
      <img class="profile" :src="account.picture" alt="">
      <h5><i class="mdi mdi-linkedin fs-5"></i></h5>
      <h5><i class="mdi mdi-github fs-5"></i></h5>
    </div> 
  </div>
</template>


<style lang="scss" scoped>
.profile{
    height: 195px;
    aspect-ratio: 1/1;
    border-radius: 50em;
    object-fit: cover;
    object-position: center
  }
</style>