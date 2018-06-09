import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

//components
import Home from './Home.vue'
import Profile from './Profile.vue';
import Users from './Users.vue';


const routes = [
    { path: '/', component: Home },
    { path: '/profile', component: Profile },
    { path: '/users', component: Users }
];

export const router = new VueRouter({
    mode:'history',
    routes
});