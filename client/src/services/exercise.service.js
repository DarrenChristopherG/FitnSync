import axios from 'axios';
const API_URL = 'http://localhost:5000/api/exercises/';

class ExerciseService {
  getAllExercises() {
    return axios.get(API_URL);
  }
  // You could add a createExercise method here for an admin panel
}

export default new ExerciseService();