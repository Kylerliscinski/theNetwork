<script setup>
import { Post } from "../models/Post.js";
import { RouterLink } from "vue-router";
import { computed } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { postsService } from "../services/PostsService.js";

defineProps({post: {type: Post, required: true}})

const account = computed(() => AppState.account)

async function destroyPost(postId){
  try {
    const wantsToDestroy = await Pop.confirm("Are you sure you want to delete this post?")
    if(!wantsToDestroy) return
    logger.log("destroying post", postId)
    await postsService.destroyPost(postId)
  } catch (error) {
    Pop.toast("Could not delete post", 'error')
    logger.error(error)
  }
}

async function likePost(postId){
    try {
      await postsService.likePost(postId)
    } catch (error) {
      Pop.error("Could not like post", 'error')
      logger.error(error)
    }
  }

</script>


<template>
  <div class="card shadow">
    <div class="container-fluid">
      <div class="row p-1">
        <div class="col-1 mt-2">
          <RouterLink :to="{name: 'Profile', params: {profileId: post.creatorId}}">
            <img class="profile" :src="post.creator.picture" alt="">
          </RouterLink>
        </div>
        <div class="col-8">
          <div class="text-start align-items-center px-3 mt-2">
            <h4>{{ post.creator.name }}</h4>
            <p>Posted on: {{ post.createdAt.toLocaleDateString() }}</p>
            <img :src="post.coverImg" alt="">
          </div>
        </div>
        <div class="col-1 mt-1">
          <div class="dropdown open">
            <button v-if="post.creatorId == account?.id" class="btn btn-outline-secondary dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Options
            </button>
            <div class="dropdown-menu p-0" aria-labelledby="triggerId">
              <button @click="destroyPost(post.id)" v-if="account" class="dropdown-item text-danger">Delete <i class="mdi mdi-trash-can"></i></button>
            </div>
          </div>
        </div>
        <div class="col-12 ms-2">
          <p>{{ post.body }}</p>
          <p>{{ post.title }}</p>
        </div>
        <div class="col-12 text-center">
            <img class="img-fluid" :src="post.imgUrl" alt="">
        </div>
      </div>

      </div>
    <div>
      <i @click="likePost(post.id)" class="mdi mdi-heart-outline float-end m-1 fs-5 selectable"> {{ post.likes.length }}</i>
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

AppState, AppState, 
