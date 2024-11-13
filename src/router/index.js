import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';
import Home from '@/components/Home.vue';
import Register from '@/components/Register.vue';
import EventList from '@/components/EventList.vue';
import Calendar from '@/components/Calendar.vue';
import ProfileEdit from '@/components/ProfileEdit.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login 
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/events',
    name: 'Events',
    component: EventList
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar
  },
  { path: '/edit-profile', 
    name: 'EditProfile', 
    component: ProfileEdit
   }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
