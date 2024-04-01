<script setup lang="ts">
import { useRouter } from "vue-router";
import { useStoreAuth } from "../../stores/storeAuth";

const storeAuth = useStoreAuth();
const router = useRouter();

const handleLogout = async () => {
  await storeAuth.logout();

  router.push("/");
};
</script>

<template>
  <nav>
    <ul>
      <li><RouterLink to="/">Home</RouterLink></li>
      <li><RouterLink to="/admin">Admin</RouterLink></li>
      <template v-if="storeAuth.user.id">
        <li>{{ storeAuth.user.email }}</li>
        <li>
          <button @click="handleLogout">Logout</button>
        </li>
      </template>
      <template v-else>
        <li><RouterLink to="/login">Login</RouterLink></li>
        <!-- <li><RouterLink to="/register">Register</RouterLink></li> -->
      </template>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;

  ul {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0;
    margin: 0;
    min-height: 3rem;

    li {
      list-style: none;
    }
  }
}
</style>
