<script setup>
import { Post } from "../models/Post.js";


defineProps({post: {type: Post, required: true}})

</script>


<template>
  <div class="card">
    <div class="card-header">
      <h4>Sidebar</h4>
      <!-- <img class="profile" :src="post.creator.picture" alt=""> -->
      <!-- <h4>Hello! {{ post.creator.name }}</h4> -->
    </div>
  </div>
</template>


<style lang="scss" scoped>
.profile{
    height: 55px;
    aspect-ratio: 1/1;
    border-radius: 50em;
    object-fit: cover;
    object-position: center
  }
</style>