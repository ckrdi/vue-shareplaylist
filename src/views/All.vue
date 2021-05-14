<template>
  <div class="home">
    <h2>All playlist(s)</h2>
    <router-link :to="{ name: 'CreatePlaylist' }">
      <h4 class="btn">Create New Playlist</h4>
    </router-link>
  </div>
  <ListView :playlists="documents" />
  <div class="error">{{ error }}</div>
</template>

<script>
import getUser from "../composables/getUser";
import getCollection from "../composables/getCollection";
import ListView from "../components/ListView.vue";

export default {
  components: {
    ListView,
  },
  setup() {
    const { user } = getUser();

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
