import axios from 'axios';
import authHeader from '../helpers/auth-header';
const API_URL = 'http://localhost:5000/api/workouts/';

class WorkoutService {
  // Post a new workout session to the backend
  logWorkout(workoutData) {
    // workoutData should be { date, notes, logs: [{ exerciseId, sets, reps, ... }] }
    return axios.post(API_URL, workoutData, { headers: authHeader() });
  }

  // Get the logged-in user's entire workout history
  getHistory() {
    return axios.get(API_URL, { headers: authHeader() });
  }
}

export default new WorkoutService();