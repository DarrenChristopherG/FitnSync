<template>
  <div class="exercise-list-view">
    <h1>Exercise Library</h1>
    <div v-if="loading">Loading exercises...</div>
    <div v-if="error" class="error">{{ error }}</div>
    
    <div v-if="!loading && exercises.length > 0" class="grid">
      <div v-for="exercise in exercises" :key="exercise.id" class="card">
        <h3>{{ exercise.name }}</h3>
        <p class="category">{{ exercise.category }}</p>
        <p>{{ exercise.description }}</p>
        <a v-if="exercise.videoUrl" :href="exercise.videoUrl" target="_blank" rel="noopener noreferrer">Watch Demo</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ExerciseService from '../services/exercise.service';

const exercises = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await ExerciseService.getAllExercises();
    exercises.value = response.data;
  } catch (err) {
    error.value = 'Failed to fetch exercises. Please try again later.';
    console.error(err);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.category {
  font-style: italic;
  color: #555;
  background-color: #f0f0f0;
  padding: 2px 8px;
  border-radius: 12px;
  display: inline-block;
  font-size: 0.8rem;
}
.error {
  color: red;
}
</style>