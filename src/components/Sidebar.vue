<script setup>
import { computed } from "vue";
import { Post } from "../models/Post.js";
import { AppState } from "../AppState.js";

const posts = computed(() => AppState.posts)
const account = computed(() => AppState.account)


</script>


<template>
  <div class="card">
    <div class="card-header">
      <h5 class="text-center my-3">Hello! {{ account.name }}</h5>
      <img class="profile" :src="account.picture" alt="">
      <h5>{{ account.linkedin }}</h5>
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