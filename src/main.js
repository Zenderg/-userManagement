import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);

//store
import {store} from './store';

//router
import {router} from './routes';

new Vue({
  el: '#app',
    store,
    router
});
