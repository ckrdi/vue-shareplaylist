<template>
  <div class="navbar">
    <nav>
      <router-link :to="{ name: 'Landing' }">
        <h1>Share Playlist</h1>
      </router-link>
      <div class="links">
        <span v-if="user">Hello there, {{ user.displayName }}</span>
        <router-link :to="{ name: 'All' }" v-if="user" class="btn">
          All
        </router-link>
        <router-link :to="{ name: 'Home' }" v-if="user" class="btn">
          Home
        </router-link>
        <button @click="handleLogout" v-if="user">Log Out</button>
        <router-link :to="{ name: 'Auth' }" v-if="!user" class="btn">
          Login
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script>
import useLogout from "../composables/useLogout";
import getUser from "../composables/getUser";
import { useRouter } from "vue-router";
export default {
  setup() {
    const { user } = getUser();
    const { logout, error } = useLogout();
    const router = useRouter();
    const handleLogout = async () => {
      await logout();
      router.push({ name: "Auth" });
    };
    return { user, error, handleLogout };
  },
};
</script>

<style scoped>
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}
nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
nav h1 {
  margin-left: 20px;
}
nav .links {
  margin-left: auto;
}
nav .links a,
button {
  margin-top: 2px;
  margin-left: 16px;
  font-size: 14px;
}
span {
  font-size: 14px;
  padding-right: 15px;
  border-right: 1px solid #eee;
}
@media only screen and (max-width: 786px) {
  nav {
    display: grid;
    gap: 8px;
  }
  nav .links {
    margin-left: 20px;
  }
}
@media only screen and (max-width: 480px) {
  nav .links {
    display: grid;
  }
  nav .links a,
  button {
    margin-top: 10px;
    margin-right: 20px;
    margin-left: 0;
    font-size: 14px;
    display: flex;
    justify-content: center;
  }
}
</style>
