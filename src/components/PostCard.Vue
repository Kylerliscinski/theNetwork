<script setup>
import { Post } from "../models/Post.js";

defineProps({post: {type: Post, required: true}})

</script>


<template>
  <div class="card">
    <div class="d-flex align-items-center m-1">
        <img class="profile" src="https://images.unsplash.com/photo-1590341328520-63256eb32bc3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
        <div class="row text-start align-items-center px-3 mt-3">
          <h4>Author</h4>
          <p>Time Posted</p>
        </div>
        <button class="float-end">Edit</button>
    </div>
    <div class="card-body">
      <p>A bunch of text</p>
    </div>
    <div>
      <i class="mdi mdi-heart float-end m-1 fs-5 selectable"></i>
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
