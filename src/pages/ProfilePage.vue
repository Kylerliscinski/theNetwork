<script setup>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { profilesService } from "../services/ProfilesService.js";
import { useRoute } from "vue-router";


const profile = computed(() => AppState.activeProfile)

const route = useRoute()

async function getProfile(){
  try {
    await profilesService.getProfile(route.params.profileId)
  } catch (error) {
    Pop.toast("Could not get profiles", 'error')
    console.error(error)
  }
}

onMounted(() => {
  getProfile()
})

</script>


<template>
Profiles Here
{{ profile }}
</template>


<style lang="scss" scoped>

</style>