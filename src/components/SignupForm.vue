<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign up</h3>
    <input
      type="text"
      required
      placeholder="display name"
      v-model="displayName"
    />
    <input type="email" required placeholder="email" v-model="email" />
    <input type="password" required placeholder="password" v-model="password" />
    <div class="error">{{ error }}</div>
    <button v-if="!isPending">Sign up</button>
    <button v-if="isPending" disabled>Loading...</button>
    <p>Already have account? <span @click="toggleForm">Log in here</span></p>
  </form>
</template>

<script>
import { ref } from "vue";
import useSignup from "../composables/useSignup";
export default {
  setup(props, context) {
    const { signup, error, isPending } = useSignup();
    const displayName = ref("");
    const email = ref("");
    const password = ref("");
    const handleSubmit = async () => {
      await signup(displayName.value, email.value, password.value);
    };
    const toggleForm = () => {
      context.emit("toggleForm");
    };
    return {
      displayName,
      email,
      password,
      handleSubmit,
      error,
      toggleForm,
      isPending,
    };
  },
};
</script>

<style scoped>
p {
  margin-top: 20px;
}
</style>
