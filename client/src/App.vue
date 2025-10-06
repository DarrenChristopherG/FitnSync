<template>
  <div id="app">
    <header v-if="authStore.isLoggedIn">
      <nav>
        <router-link to="/">Dashboard</router-link> |
        <router-link to="/log-workout">Log Workout</router-link> |
        <router-link to="/history">History</router-link> |
        <router-link to="/exercises">Exercises</router-link>
      </nav>
      <span>Welcome, {{ authStore.user?.username }}!</span>
      <button @click="handleLogout">Logout</button>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from './store/auth.store';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<style>
/* Add your global styles here */
header { display: flex; justify-content: space-between; align-items: center; padding: 10px; background-color: #f3f3f3; }
nav { display: flex; gap: 15px; }
</style>