import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';
import LandingPage from '@/components/LandingPage.vue';
import Register from '@/components/Register.vue';
import EventList from '@/components/EventList.vue';
import Calendar from '@/components/Calendar.vue';
import ProfileEdit from '@/components/ProfileEdit.vue';
import MyEvent from '@/components/MyEvent.vue';
import GuestEventDetail from '@/components/GuestEventDetail.vue';
import EventDetail from '@/components/EventDetail.vue';
import EventForm from '@/components/EventForm.vue';
import EditEvent from '@/components/EditEvent.vue';
import SearchResults from '@/components/SearchResults.vue';
import PqrForm from '@/components/PqrForm.vue';

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      localStorage.clear();
      next();
    },
  },
  {
    path: '/landingPage',
    name: 'LandingPage',
    component: LandingPage,
  },
  {
    path: '/events',
    name: 'Events',
    component: EventList,
  },
  {
    path: '/events/:id',
    name: 'EventDetail',
    component: EventDetail,
    props: true,
  },
  {
    path: '/pqr',
    name: 'PqrForm',
    component: PqrForm
  },
  {
    path: '/events/edit/:id',
    name: 'EditEvent',
    component: EditEvent,
    props: true,
  },
  {
    path: '/search',
    name: 'SearchResults',
    component: SearchResults,
  },
  {
    path: '/guest-event/:id',
    name: 'GuestEventDetail',
    component: GuestEventDetail,
    props: route => ({ id: route.params.id })
  },  
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar,
    meta: { requiresAuth: true },
  },
  {
    path: '/edit-profile',
    name: 'EditProfile',
    component: ProfileEdit,
    meta: { requiresAuth: true },
  },
  {
    path: '/my-events',
    name: 'MyEvents',
    component: MyEvent,
    meta: { requiresAuth: true },
  },
  {
    path: '/create-event',
    name: 'CreateEvent',
    component: EventForm,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🛡️ Global guard para proteger rutas privadas
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const publicPaths = ['/login', '/register', '/guest-event'];

  const isPublic = publicPaths.some(path => to.path.startsWith(path));
  const requiresAuth = to.meta.requiresAuth;

  if (requiresAuth && !token) {
    return next('/login');
  }

  next();
});

export default router;
