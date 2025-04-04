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
const routes = [
  {
    path: '/',
    redirect: '/login', 
  },
  {
    path: '/login',
    name: 'Login',
    component: Login 
  },
  {
    path: '/register',
    component: () => import('../components/Register.vue'),
    beforeEnter: (to, from, next) => {
      localStorage.clear(); 
      next();
    },
  },
  {
    path: '/events/:id',
    name: 'EventDetail',
    component: EventDetail, 
    props: true 
  },
  {
    path: '/events/edit/:id',
    name: 'EditEvent',
    component: EditEvent, 
    props: true 
  },
  {
    path: '/landingPage',
    name: 'LandingPage',
    component: LandingPage
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
    path: "/guest-event/:id",
    name: "GuestEventDetail",
    component: GuestEventDetail
  },
  
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar
  },
  { path: '/edit-profile', 
    name: 'EditProfile', 
    component: ProfileEdit
   },
   {
    path: '/my-events',
    name: 'MyEvents',
    component: MyEvent
  },
  { path: "/create-event", 
    component: EventForm 
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
