<template>
  <form @submit.prevent="handleSubmit">
    <h3>Log in</h3>
    <input type="email" required placeholder="email" v-model="email" />
    <input type="password" required placeholder="password" v-model="password" />
    <div class="error">{{ error }}</div>
    <button v-if="!isPending">Log in</button>
    <button v-if="isPending" disabled>Loading...</button>
    <p>Don't have account? <span @click="toggleForm">Sign up here.</span></p>
  </form>
</template>

<script>
import { ref } from "vue";
import useLogin from "../composables/useLogin";
export default {
  setup(props, context) {
    const { login, error, isPending } = useLogin();
    const email = ref("");
    const password = ref("");
    const handleSubmit = async () => {
      await login(email.value, password.value);
    };
    const toggleForm = () => {
      context.emit("toggleForm");
    };
    return { email, password, handleSubmit, error, toggleForm, isPending };
  },
};
</script>

<style scoped>
p {
  margin-top: 20px;
}
</style>
