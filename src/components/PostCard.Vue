<script setup>
import { Post } from "../models/Post.js";
import { RouterLink } from "vue-router";

defineProps({post: {type: Post, required: true}})

</script>


<template>
  <div class="card">
    <div class="d-flex align-items-center m-1">
      <RouterLink :to="{name: 'Profile', params: {profileId: post.creatorId}}">
        <img class="profile" :src="post.creator.picture" alt="">
      </RouterLink>
      <div class="row text-start align-items-center px-3 mt-3">
        <h4>{{ post.creator.name }}</h4>
        <p>Posted on: {{ post.createdAt.toLocaleDateString() }}</p>
        <img :src="post.coverImg" alt="">
      </div>
      <button class="float-end">Edit</button>
    </div>
    <div class="card-body">
      <p>{{ post.body }}</p>
      <p>{{ post.title }}</p>
      <img class="img-fluid" :src="post.imgUrl" alt="">
    </div>
    <div>
      <i class="mdi mdi-heart float-end m-1 fs-5 selectable">{{ post.likes.length }}</i>
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