<script setup>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { profilesService } from "../services/ProfilesService.js";
import { useRoute } from "vue-router";
import { postsService } from "../services/PostsService.js";
import PostCard from "../components/PostCard.vue";


const profile = computed(() => AppState.activeProfile)

const posts = computed(() => AppState.profilePosts)

const route = useRoute()

async function getProfile(){
  try {
    await profilesService.getProfile(route.params.profileId)
  } catch (error) {
    Pop.toast("Could not get profiles", 'error')
    console.error(error)
  }
}

async function getProfilePosts(){
  try {
    await postsService.getProfilePosts(route.params.profileId)
  } catch (error) {
    Pop.toast("Could not get Profile Posts", 'error')
    console.error(error)
  }
}

onMounted(() => {
  getProfile()
  getProfilePosts()
})

</script>


<template>
  <div class="container">
    <section v-if="profile" class="row">
      <img class="cover-img" :src="profile.coverImg" alt="">
      <div class="col-12 text-center">
        <img :src="profile.picture" alt="" class="profile-img">
        <h3>{{ profile.name }}</h3>
        <p>Graduated? {{ profile.graduated }}</p>
        <p>Class: {{ profile.class }}</p>
      </div>
      <div class="col-12 text-center">
        <p class="mt-3">Bio: {{ profile.bio }}</p>
      </div>
      <div class="col-12 text-center">
        <a v-if="profile.linkedin" :href="profile.linkedin" target="_blank"><i class="mdi mdi-linkedin fs-5"></i></a>
        <a v-if="profile.github" :href="profile.github" target="_blank"><i class="mdi mdi-github fs-5"></i></a>
      </div>
    </section>

    <section class="row justify-content-center">
      <div v-for="post in posts" :key="post.id" class="col-7 mb-3">
        <PostCard :post="post" />
      </div>
    </section>
  </div>
</template>


<style lang="scss" scoped>
.cover-img{
  width: 100%;
  height: 20vh;
  margin-bottom: -10vh;
  object-fit: cover;
  object-position: center;
}

.profile-img{
  height: 100px;
  width: 100px;
  object-fit: cover;
  object-position: center;
}
</style>