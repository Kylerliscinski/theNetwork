<script setup>
import { computed } from "vue";
import { Post } from "../models/Post.js";
import { AppState } from "../AppState.js";

const posts = computed(() => AppState.posts)
const account = computed(() => AppState.account)


</script>


<template>
  <!-- //FIXME - Fix this error -->
  <div class="card row text-center">
    <div class="card-header">
      <!-- <h5 class="text-center my-3">Hello! {{ account.name }}</h5> -->
      <!-- <img class="profile" :src="account.picture" alt=""> -->
      <!-- <h5><i class="mdi mdi-linkedin fs-5"></i> {{ account.linkedin }}</h5> -->
      <!-- <h5><i class="mdi mdi-github fs-5"></i> {{ account.github }}</h5> -->
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