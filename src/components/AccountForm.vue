<script setup>
import { ref, onMounted } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { accountService } from "../services/AccountService.js";


const accountData = ref({
  name: '',
  picture: '',
  coverImg: '',
  bio: '',
  linkedin: '',
  github: ''
})

onMounted(() => {
  accountData.value = {...AppState.account}
})

async function saveAccount(){
  try {
    await accountService.updateAccount(accountData.value)
  } catch (error) {
    Pop.toast("Could not save changes", 'error')
    logger.error(error)
  }
}

</script>


<template>
  <form @submit.prevent="saveAccount()" class="row">
    <div class="mb-3 col-4">
      <label for="account-name">Name</label>
      <input v-model="accountData.name" class="form-control" type="text" id="account-name"  minlength="3" required maxlength="25"/>
    </div>
    <div class="mb-3 col-4">
      <label for="account-picture">Picture</label>
      <input v-model="accountData.picture" class="form-control" type="url" id="account-picture" required maxlength="500">
    </div>
    <div class="mb-3 col-4">
      <label for="account-cover-image">Cover Image</label>
      <input v-model="accountData.coverImg" class="form-control" type="url" id="account-cover-image" required maxlength="500">
    </div>
    <div class="mb-3 col-12">
      <label for="account-bio">Bio</label>
      <textarea v-model="accountData.bio" name="account-bio" id="account-bio" rows="5" class="form-control"></textarea>
    </div>
    <div class="mb-3 col-6">
      <label for="account-linkedin-link">Linkedin</label>
      <input v-model="accountData.linkedin" class="form-control" type="url" id="account-linkedin-link"  maxlength="500">
    </div>
    <div class="mb-3 col-6">
      <label for="account-github-link">Github</label>
      <input v-model="accountData.github" class="form-control" type="url" id="account-github-link"  maxlength="500">
    </div>
    <div class="mb-3 col-12 d-flex align-items-end justify-content-end">
      <button class="btn btn-success w-25 float-end">Save <i class="mdi mdi-floppy"></i></button>
    </div>
  </form>

  <section class="row" v-if="accountData">
          <img class="cover-img" :src="accountData.coverImg" alt="">
        <div class="col-12 text-center">
          <img class="accountData-img" :src="accountData.picture" alt="">
          <h2>{{ accountData.name }}</h2>
        </div>
        <div class="col-12">
          <p class="mt-2" >{{ accountData.bio }}</p>
        </div>
        <div class="col-6">
          <a v-if="accountData.linkedin" :href="accountData.linkedin" target="_blank"><i class="mdi mdi-linkedin fs-4"></i></a>
        </div>
        <div class="col-6">
          <a v-if="accountData.github" :href="accountData.github" target="_blank"><i class="mdi mdi-github fs-4"></i></a>
        </div>
      </section>
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