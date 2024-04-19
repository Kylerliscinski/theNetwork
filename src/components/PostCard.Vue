<script setup>
import { Post } from "../models/Post.js";

defineProps(post: Post)

</script>


<template>
<div class="col-6 card-header d-flex">
      <img :src="Post" alt="">
    </div>
</template>


<style lang="scss" scoped>

</style>