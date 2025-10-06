<template>
  <div class="history-view">
    <h1>Workout History</h1>
    <div v-if="loading">Loading your history...</div>
    <div v-if="error" class="error">{{ error }}</div>
    
    <div v-if="!loading && workouts.length === 0">
      <p>You haven't logged any workouts yet. Let's get started!</p>
      <router-link to="/log-workout">Log a Workout</router-link>
    </div>

    <div v-if="!loading && workouts.length > 0" class="workouts-container">
      <div v-for="workout in workouts" :key="workout.id" class="workout-card">
        <h2>Workout on {{ new Date(workout.date).toLocaleDateString() }}</h2>
        <p v-if="workout.notes" class="notes">Notes: {{ workout.notes }}</p>
        
        <ul>
          <li v-for="log in workout.logs" :key="log.id">
            <strong>{{ log.Exercise.name }}</strong>:
            <span v-if="log.sets">{{ log.sets }} sets</span>
            <span v-if="log.reps">x {{ log.reps }} reps</span>
            <span v-if="log.weight">@ {{ log.weight }} kg</span>
            <span v-if="log.durationInSeconds">{{ log.durationInSeconds }} seconds</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import WorkoutService from '../services/workout.service';

const workouts = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await WorkoutService.getHistory();
    // The backend sends rich, nested data thanks to the 'include' in Sequelize
    workouts.value = response.data;
  } catch (err) {
    error.value = "Failed to fetch workout history.";
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.workouts-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.workout-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  background-color: #fafafa;
}
.notes {
  font-style: italic;
  color: #666;
  margin-bottom: 1rem;
}
ul {
  list-style-type: none;
  padding-left: 0;
}
li {
  margin-bottom: 0.5rem;
}
.error {
  color: red;
}
</style>