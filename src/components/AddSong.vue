<template>
  <div class="add-song">
    <div class="error">{{ error }}</div>
    <button v-if="!showForm" @click="toggleForm">Add Song</button>
    <button v-if="showForm" @click="toggleForm">
      Close
    </button>
    <form v-if="showForm" @submit.prevent="handleSubmit">
      <h4>Add a new song</h4>
      <input
        type="text"
        placeholder="song title"
        required
        v-model="title"
        @input="hasAdded = null"
      />
      <input
        type="text"
        placeholder="artist"
        required
        v-model="artist"
        @input="hasAdded = null"
      />
      <button v-if="!adding">Add</button>
      <button v-if="adding" disabled>Loading...</button>
      <div class="error">{{ songError }}</div>
      <div>{{ hasAdded }}</div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { nanoid } from "nanoid";
import getCollection from "../composables/getCollection";
import { projectFirestore } from "../firebase/config";

export default {
  props: {
    id: String,
  },
  setup(props) {
    const title = ref("");
    const artist = ref("");
    const showForm = ref(false);
    const songError = ref(null);
    const adding = ref(false);
    const hasAdded = ref(null);

    const { documents: playlist, error } = getCollection("playlists", props.id);

    const toggleForm = () => {
      showForm.value = !showForm.value;
      hasAdded.value = null;
    };

    const handleSubmit = async () => {
      songError.value = null;
      hasAdded.value = null;
      const newSong = {
        title: title.value,
        artist: artist.value,
        id: nanoid(),
      };
      try {
        adding.value = true;
        await projectFirestore
          .collection("playlists")
          .doc(props.id)
          .update({
            songs: [...playlist.value.songs, newSong],
          });
        title.value = "";
        artist.value = "";
        adding.value = false;
        hasAdded.value = "Song added!";
      } catch (err) {
        songError.value = err.message;
      }
    };

    return {
      title,
      artist,
      showForm,
      toggleForm,
      handleSubmit,
      error,
      songError,
      adding,
      hasAdded,
    };
  },
};
</script>

<style scoped>
.add-song {
  text-align: center;
  margin-top: 40px;
}
form {
  max-width: 100%;
  text-align: left;
}
button {
  margin-bottom: 20px;
}
form button {
  margin-bottom: 0;
}
</style>
