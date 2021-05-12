<template>
  <form @submit.prevent="handleSubmit">
    <h3>Create New Playlist</h3>
    <input
      type="text"
      required
      placeholder="playlist title"
      v-model="title"
      @input="hasCreated = null"
    />
    <textarea
      required
      placeholder="playlist description"
      v-model="description"
      @input="hasCreated = null"
    ></textarea>
    <!-- upload image file -->
    <h4>Upload playlist cover image (required)</h4>
    <input type="file" @change="handleChange" />
    <div class="error">{{ fileError }}</div>
    <div class="error">{{ storageError }}</div>
    <div class="error">{{ error }}</div>
    <div>{{ hasCreated }}</div>
    <button v-if="!isPending">Create</button>
    <button v-if="isPending" disabled>Loading...</button>
  </form>
</template>

<script>
import { ref, watch } from "vue";
import getUser from "../composables/getUser";
import { useRouter } from "vue-router";
import useStorage from "../composables/useStorage";
import useCollection from "../composables/useCollection";
import { timestamp } from "../firebase/config";

export default {
  setup() {
    const title = ref("");
    const description = ref("");
    const imageFile = ref(null);
    const fileError = ref(null);
    const isPending = ref(false);
    const hasCreated = ref(null);
    const { user } = getUser();
    const router = useRouter();
    const { storageError, url, filePath, uploadImage } = useStorage();
    const { error, addDoc } = useCollection("playlists");

    const handleSubmit = async () => {
      hasCreated.value = null;
      // check if the playlist has the cover image uploaded
      if (imageFile.value) {
        isPending.value = true;
        await uploadImage(imageFile.value);
        const res = await addDoc({
          title: title.value,
          description: description.value,
          coverUrl: url.value,
          filePath: filePath.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          createdAt: timestamp(),
          songs: [],
        });
        title.value = "";
        description.value = "";
        imageFile.value = null;
        isPending.value = false;
        hasCreated.value = "Your playlist has been created!";
        if (!error.value) {
          router.push({ name: "PlaylistDetails", params: { id: res.id } });
        }
      } else {
        fileError.value = "Please upload a .png or .jpg/.jpeg image";
      }
    };

    // allowed file types
    const fileTypes = ["image/png", "image/jpeg"];

    const handleChange = (e) => {
      const selectedFile = e.target.files[0];
      // check if there is a file uploaded AND the file type is correct
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        fileError.value = null;
        imageFile.value = selectedFile;
      } else {
        fileError.value = "Please upload a .png or .jpg/.jpeg image";
        imageFile.value = null;
      }
    };

    watch(user, () => {
      if (!user.value) {
        router.push({ name: "Auth" });
      }
    });

    return {
      handleSubmit,
      title,
      description,
      handleChange,
      fileError,
      storageError,
      error,
      isPending,
      hasCreated,
    };
  },
};
</script>

<style>
textarea {
  resize: none;
  font-size: 12px;
}
input[type="file"] {
  border: 0;
  padding: 0;
}
label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}
button {
  margin-top: 20px;
}
</style>
