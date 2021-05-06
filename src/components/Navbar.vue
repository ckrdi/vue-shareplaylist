<template>
  <div class="navbar">
    <nav>
      <router-link :to="{ name: 'Landing' }">
        <h1>Share Playlist</h1>
      </router-link>
      <div class="links">
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
export default {
  setup() {
    const { user } = getUser();
    const { logout, error } = useLogout();
    const handleLogout = async () => {
      await logout();
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
</style>
