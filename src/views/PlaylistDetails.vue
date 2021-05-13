<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="deleteErr" class="error">{{ deleteErr }}</div>
  <div v-if="playlist" class="playlist-details">
    <!-- playlist info -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" />
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button v-if="ownership && !deleting" @click="handleDelete">
        Delete Playlist
      </button>
      <button v-if="deleting" disabled>Loading...</button>
    </div>
    <!-- song list -->
    <div class="song-list">
      <p>songs here</p>
    </div>
  </div>
</template>

<script>
import getCollection from "../composables/getCollection";
import getUser from "../composables/getUser";
import { computed, ref } from "vue";
import { projectFirestore, projectStorage } from "../firebase/config";
import { useRouter } from "vue-router";

export default {
  props: {
    id: String,
  },
  setup(props) {
    const { documents: playlist, error } = getCollection("playlists", props.id);
    const { user } = getUser();
    const router = useRouter();
    const deleteErr = ref(null);
    const deleting = ref(false);

    const ownership = computed(() => {
      return (
        playlist.value && user.value && user.value.uid == playlist.value.userId
      );
    });

    const handleDelete = async () => {
      deleting.value = true;
      let sure = confirm("Are you sure you want to delete this playlist?");
      if (sure) {
        const storageRef = projectStorage.ref(playlist.value.filePath);
        try {
          await storageRef.delete();
          await projectFirestore
            .collection("playlists")
            .doc(props.id)
            .delete();
          router.push("/home");
        } catch (err) {
          deleteErr.value = err.message;
          deleting.value = false;
        }
      } else {
        deleting.value = false;
      }
    };

    return { playlist, error, ownership, handleDelete, deleteErr, deleting };
  },
};
</script>

<style>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}
.cover img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  max-width: 200%;
  max-height: 200%;
}
.playlist-info {
  text-align: center;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.playlist-info p {
  margin-bottom: 20px;
}
.username {
  color: #999;
}
.description {
  text-align: left;
}
@media only screen and (max-width: 480px) {
  .playlist-details {
    display: block;
  }
  .song-list {
    margin-top: 100px;
  }
}
</style>
