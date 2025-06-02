import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Dashboard from "../views/ChargeDashboard.vue";
import Signup from '../components/Signup.vue';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/signup', component: Signup },
    { path : '/login' , component: Login},
    { path : '/dashboard', component:Dashboard},
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});


router.beforeEach((to, from, next) => {

  const isAuthenticated = !!localStorage.getItem('token')

  if (to.meta.requiresAuth && !isAuthenticated) {
    
    next('/login')
  } 
  else {
    next()
  }


})



export default router;

