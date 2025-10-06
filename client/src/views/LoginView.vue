<template>
  <div>
    <h2>Login to Fitness Tracker</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label>Username:</label>
        <input type="text" v-model="username" required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit" :disabled="loading">Login</button>
      <div v-if="message">{{ message }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth.store';

const username = ref('');
const password = ref('');
const loading = ref(false);
const message = ref('');

const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  loading.value = true;
  message.value = '';
  try {
    await authStore.login({ username: username.value, password: password.value });
    router.push('/'); // Redirect to Dashboard
  } catch (error) {
    message.value = error.response?.data?.message || 'Login failed!';
  } finally {
    loading.value = false;
  }
};
</script>