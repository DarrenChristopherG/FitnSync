<template>
  <div>
    <h1>Log New Workout</h1>
    <form @submit.prevent="submitWorkout">
      <div>
        <label>Date:</label>
        <input type="date" v-model="workout.date" required />
      </div>

      <div v-for="(log, index) in workout.logs" :key="index" class="log-entry">
        <select v-model="log.ExerciseId" required>
          <option disabled value="">Select an exercise</option>
          <option v-for="ex in exercises" :key="ex.id" :value="ex.id">{{ ex.name }}</option>
        </select>
        <input type="number" v-model.number="log.sets" placeholder="Sets" />
        <input type="number" v-model.number="log.reps" placeholder="Reps" />
        <input type="number" v-model.number="log.weight" placeholder="Weight (kg)" />
        <button type="button" @click="removeLog(index)">Remove</button>
      </div>

      <button type="button" @click="addLog">Add Exercise</button>
      <hr />
      <button type="submit">Save Workout</button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ExerciseService from '../services/exercise.service';
import WorkoutService from '../services/workout.service';

const router = useRouter();
const exercises = ref([]); // Master list of all exercises
const workout = reactive({
  date: new Date().toISOString().slice(0, 10),
  notes: '',
  logs: []
});

onMounted(async () => {
  try {
    const response = await ExerciseService.getAllExercises();
    exercises.value = response.data;
  } catch (error) {
    console.error("Failed to fetch exercises:", error);
  }
});

const addLog = () => {
  workout.logs.push({ ExerciseId: '', sets: null, reps: null, weight: null });
};

const removeLog = (index) => {
  workout.logs.splice(index, 1);
};

const submitWorkout = async () => {
  try {
    // Filter out empty logs before sending
    const validLogs = workout.logs
        .filter(log => log.ExerciseId)
        .map(log => ({ // Ensure ExerciseId is a number
            ...log,
            ExerciseId: Number(log.ExerciseId)
        }));

    await WorkoutService.logWorkout({ ...workout, logs: validLogs });
    router.push('/history'); // Redirect to history after logging
  } catch (error) {
    console.error("Failed to save workout:", error);
    alert("Could not save workout.");
  }
};

// Add a default log entry to start
addLog();
</script>

<style scoped>
.log-entry { display: flex; gap: 10px; margin-bottom: 10px; }
</style>