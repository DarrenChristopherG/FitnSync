import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/auth.store';

// Import Views
import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue';
import LogWorkoutView from '../views/LogWorkoutView.vue';
import HistoryView from '../views/HistoryView.vue';
import ExerciseListView from '../views/ExerciseListView.vue';

const routes = [
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/', name: 'Dashboard', component: DashboardView, meta: { requiresAuth: true } },
  { path: '/log-workout', name: 'LogWorkout', component: LogWorkoutView, meta: { requiresAuth: true } },
  { path: '/history', name: 'History', component: HistoryView, meta: { requiresAuth: true } },
  { path: '/exercises', name: 'Exercises', component: ExerciseListView, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard (identical to POS version)
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !authStore.isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;