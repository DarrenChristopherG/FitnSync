import { defineStore } from 'pinia';
import AuthService from '../services/auth.service';
import router from '../router'; // Import router to handle redirects

// Attempt to get user from localStorage to maintain session
const user = JSON.parse(localStorage.getItem('user'));

export const useAuthStore = defineStore('auth', {
  // Initial state of the store
  state: () => ({
    user: user ? user : null,
    loginError: null,
  }),
  
  // Getters are like computed properties for stores
  getters: {
    isLoggedIn: (state) => !!state.user,
    currentUser: (state) => state.user,
  },
  
  // Actions are methods that can mutate the state
  actions: {
    async login(userCredentials) {
      this.loginError = null; // Reset error before new attempt
      try {
        const userData = await AuthService.login(userCredentials);
        this.user = userData; // Update state with user data from API
        return Promise.resolve(userData);
      } catch (error) {
        this.user = null; // Clear user state on failure
        this.loginError = error.response?.data?.message || 'An unknown error occurred.';
        return Promise.reject(error);
      }
    },

    logout() {
      AuthService.logout(); // Removes user from localStorage
      this.user = null; // Clears user from state
      router.push('/login'); // Redirect to login page
    },

    async signup(userCredentials) {
      // Signup doesn't automatically log the user in, so we just pass the call through
      return AuthService.signup(userCredentials);
    }
  },
});