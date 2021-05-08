<template>
  <form @submit.prevent="handleSubmit">
    <h3>Create New Playlist</h3>
    <input type="text" required placeholder="playlist title" v-model="title" />
    <textarea
      required
      placeholder="playlist description"
      v-model="description"
    ></textarea>
    <!-- upload image file -->
    <h4>Upload playlist cover image (required)</h4>
    <input type="file" @change="handleChange" />
    <div class="error">{{ fileError }}</div>
    <button>Create</button>
  </form>
</template>

<script>
import { ref, watch } from "vue";
import getUser from "../composables/getUser";
import { useRouter } from "vue-router";

export default {
  setup() {
    const title = ref("");
    const description = ref("");
    const imageFile = ref(null);
    const fileError = ref(null);

    const handleSubmit = () => {
      // check if the playlist has the cover image uploaded
      if (imageFile.value) {
        console.log(title.value, description.value, imageFile.value);
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

    const { user } = getUser();
    const router = useRouter();
    watch(user, () => {
      if (!user.value) {
        router.push({ name: "Auth" });
      }
    });

    return { handleSubmit, title, description, handleChange, fileError };
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
