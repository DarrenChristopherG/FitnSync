<template>
  <div>
    <h1>Welcome, {{ authStore.user?.username }}!</h1>
    <h2>Your Recent Workouts</h2>
    <div v-if="loading">Loading history...</div>
    <div v-else-if="recentWorkouts.length > 0">
      <div v-for="workout in recentWorkouts" :key="workout.id" class="workout-summary">
        <h3>Workout on {{ new Date(workout.date).toLocaleDateString() }}</h3>
        <ul>
          <li v-for="log in workout.logs" :key="log.id">
            {{ log.Exercise.name }}: {{ log.sets }} sets, {{ log.reps }} reps @ {{ log.weight }}kg
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <p>You haven't logged any workouts yet.</p>
      <router-link to="/log-workout">Log your first workout!</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '../store/auth.store';
import WorkoutService from '../services/workout.service';

const authStore = useAuthStore();
const history = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await WorkoutService.getHistory();
    history.value = response.data;
  } catch (error) {
    console.error("Failed to fetch workout history:", error);
  } finally {
    loading.value = false;
  }
});

// A computed property to just show the last 3 workouts
const recentWorkouts = computed(() => history.value.slice(0, 3));
</script>

<style scoped>
.workout-summary { border: 1px solid #eee; padding: 15px; margin-bottom: 15px; border-radius: 8px; }
</style>