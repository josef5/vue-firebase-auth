<script setup lang="ts">
import { ref } from "vue";
import { useStoreAuth } from "../stores/storeAuth";
import { useRoute, useRouter } from "vue-router";

const storeAuth = useStoreAuth();
const route = useRoute();
const router = useRouter();

const email = ref("test@test.com");
const password = ref("aaaaaaa");
const errorMessages = ref<string[]>([]);

const validateForm = () => {
  errorMessages.value = [];

  if (email.value === "" || password.value === "") {
    errorMessages.value.push("Both fields are required.");
  }

  if (!email.value.includes("@")) {
    errorMessages.value.push("Email address must be a valid email.");
  }

  if (password.value.length < 6) {
    errorMessages.value.push("Password must be at least 6 characters.");
  }

  if (errorMessages.value.length > 0) {
    return false;
  }

  return true;
};

const handleSubmit = async () => {
  if (validateForm()) {
    console.log(`Email: ${email.value}, Password: ${password.value}`);

    try {
      await storeAuth.login({ email: email.value, password: password.value });

      // If a redirect route is provided in the query parameters, use it. Otherwise, default to the home route
      let redirectRoute = route.query.redirect;

      if (Array.isArray(redirectRoute)) {
        redirectRoute = redirectRoute[0];
      }

      router.push(redirectRoute || "/");
    } catch (error) {
      console.error(error);
      errorMessages.value = [(error as Error).message];
    }
  }
};
</script>

<template>
  <h1>Login</h1>

  <form @submit.prevent="handleSubmit">
    <label for="email">Email</label>
    <input
      type="text"
      id="email"
      name="email"
      placeholder="e.g. alice@example.com"
      v-model="email"
    />
    <label for="password">Password</label>
    <input type="password" id="password" name="password" v-model="password" />
    <button type="submit">Login</button>
  </form>
  <p v-for="errorMessage in errorMessages">{{ errorMessage }}</p>
  <small
    >Dont have a login? <RouterLink to="/register">Register</RouterLink></small
  >
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 300px;

  button {
    margin-block: 1rem;
  }
}
</style>
