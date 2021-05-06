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
import { useRouter } from "vue-router";
import { watch } from "vue";
import getUser from "../composables/getUser";

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
    const router = useRouter();
    const { user } = getUser();
    watch(user, () => {
      if (user.value) {
        router.push({ name: "Home" });
      }
    });
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
