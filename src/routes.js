import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

//components
import Home from './components/Home.vue'
import Profile from './components/Profile.vue';
import Users from './components/Users.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/profile', component: Profile },
    { path: '/users', component: Users },
    { path: '*', redirect: to => "/"}
];

export const router = new VueRouter({
    mode:'history',
    routes
});