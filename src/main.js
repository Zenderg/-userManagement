import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);

//store
import {store} from './store';

//router
import {router} from './routes';
router.beforeEach((to, from, next) => {
    if ( to.path!=="/" && !store.state.authorized ) {
        next("/");
    } else {
        next();
    }
});

new Vue({
  el: '#app',
    methods:{
      Exit(){
          this.$store.commit("switchAuthorization");
          this.$router.push('/');
      }
    },
    store,
    router
});