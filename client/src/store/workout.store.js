import { defineStore } from 'pinia';
import WorkoutService from '../services/workout.service';

export const useWorkoutStore = defineStore('workout', {
  state: () => ({
    // Represents the workout session currently being created
    newWorkout: {
      date: new Date().toISOString().slice(0, 10), // Default to today
      notes: '',
      logs: [], // An array of { ExerciseId, sets, reps, weight, ... }
    },
    isSubmitting: false,
    error: null,
  }),

  actions: {
    // Resets the form for a new workout
    startNewWorkout() {
      this.newWorkout = {
        date: new Date().toISOString().slice(0, 10),
        notes: '',
        logs: [],
      };
      this.addLogEntry(); // Start with one empty entry
    },

    // Adds a new empty log entry to the current workout
    addLogEntry() {
      this.newWorkout.logs.push({ 
        ExerciseId: null, 
        sets: null, 
        reps: null, 
        weight: null 
      });
    },

    // Removes a log entry by its index in the array
    removeLogEntry(index) {
      this.newWorkout.logs.splice(index, 1);
    },

    // Submits the completed workout to the backend
    async saveWorkout() {
      this.isSubmitting = true;
      this.error = null;
      try {
        // Filter out any logs where an exercise wasn't selected
        const validLogs = this.newWorkout.logs.filter(log => log.ExerciseId);
        if (validLogs.length === 0) {
          throw new Error("Cannot save an empty workout. Please add at least one exercise.");
        }
        
        await WorkoutService.logWorkout({ ...this.newWorkout, logs: validLogs });
        this.startNewWorkout(); // Reset the form after successful submission
        return Promise.resolve();
      } catch (error) {
        this.error = error.message || 'Failed to save workout.';
        return Promise.reject(error);
      } finally {
        this.isSubmitting = false;
      }
    }
  },
});