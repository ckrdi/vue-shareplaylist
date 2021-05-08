<template>
  <div class="home">
    <h2>Hello Vue</h2>
    <router-link :to="{ name: 'CreatePlaylist' }">
      <h2>Create New Playlist</h2>
    </router-link>
  </div>
</template>

<script>
import { watch } from "vue";
import getUser from "../composables/getUser";
import { useRouter } from "vue-router";
export default {
  setup() {
    const { user } = getUser();
    const router = useRouter();
    watch(user, () => {
      if (!user.value) {
        router.push({ name: "Landing" });
      }
    });
  },
};
</script>
