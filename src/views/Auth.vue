<template>
  <div class="welcome">
    <div v-if="haveAccount">
      <LoginForm @toggleForm="toggleForm" />
    </div>
    <div v-else>
      <SignupForm @toggleForm="toggleForm" />
    </div>
  </div>
</template>

<script>
import SignupForm from "../components/SignupForm.vue";
import LoginForm from "../components/LoginForm.vue";
import { ref } from "vue";

export default {
  components: {
    SignupForm,
    LoginForm,
  },
  setup() {
    const haveAccount = ref(true);
    const toggleForm = () => {
      haveAccount.value = !haveAccount.value;
    };
    return { haveAccount, toggleForm };
  },
};
</script>

<style>
.welcome {
  text-align: center;
  padding: 20px 0;
}
.welcome span {
  text-decoration: underline;
  cursor: pointer;
}
</style>
