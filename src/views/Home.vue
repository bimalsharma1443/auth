<template>
  <div class="home">
    <h1>Welcome to the App!</h1>
    <div v-if="!LoggedIn">
      To use this app you'll need to
      <router-link :to="{ name: 'register' }">Register</router-link> OR
      <router-link :to="{ name: 'login' }">Login</router-link>
    </div>
  </div>
</template>

<script>
import { authComputed } from "../vuex/helper";
export default {
  computed: {
    ...authComputed
  }
};
</script>
