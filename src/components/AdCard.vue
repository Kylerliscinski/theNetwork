<script setup>
import { Ad } from "../models/Ad.js";


defineProps({ad: Ad})

</script>


<template>
  <div class="row card">
    <div class="card-header">
      <h4>{{ ad.title }}</h4>
      <img class="img-fluid" :src="ad.tall" alt="">
    </div>
  </div>
</template>


<style lang="scss" scoped>

</style>