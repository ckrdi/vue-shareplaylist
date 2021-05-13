<template>
  <div class="home">
    <h2 v-if="user">Hello, {{ user.displayName }}.</h2>
    <router-link :to="{ name: 'CreatePlaylist' }">
      <h2 class="btn">Create New Playlist</h2>
    </router-link>
  </div>
  <ListView :playlists="documents" />
  <div class="error">{{ error }}</div>
</template>

<script>
import { watch } from "vue";
import getUser from "../composables/getUser";
import { useRouter } from "vue-router";
import getCollection from "../composables/getCollection";
import ListView from "../components/ListView.vue";
export default {
  components: {
    ListView,
  },
  setup() {
    const { user } = getUser();
    const router = useRouter();
    watch(user, () => {
      if (!user.value) {
        router.push({ name: "Auth" });
      }
    });

    const { documents, error } = getCollection("playlists");

    return { user, documents, error };
  },
};
</script>

<style scoped>
.home {
  display: flex;
  justify-content: space-between;
}
@media only screen and (max-width: 480px) {
  .home {
    display: grid;
    gap: 8px;
  }
}
</style>
