<template>
  <div class="home">
    <h2>Hello Home</h2>
    <router-link :to="{ name: 'CreatePlaylist' }">
      <h2>Create New Playlist</h2>
    </router-link>
  </div>
  <div v-for="document in documents" :key="document.id">
    <h5>{{ document.userName }}</h5>
    <h4>{{ document.title }}</h4>
    <h4>{{ document.description }}</h4>
    <img :src="document.coverUrl" />
  </div>
  <div class="error">{{ error }}</div>
</template>

<script>
import { watch } from "vue";
import getUser from "../composables/getUser";
import { useRouter } from "vue-router";
import getCollection from "../composables/getCollection";
export default {
  setup() {
    const { user } = getUser();
    const router = useRouter();
    watch(user, () => {
      if (!user.value) {
        router.push({ name: "Landing" });
      }
    });

    const { documents, error } = getCollection("playlists");

    return { documents, error };
  },
};
</script>
