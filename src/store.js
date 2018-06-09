import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        users:[
            {id:1,name:"Admin",surname:"Admin",patronymic:"Admin",age:42,email:"admin@admin.com",password:"admin"}
        ],
        currentUser:{id:0,name:"",surname:"",patronymic:"",age:0,email:"",password:""},
        authorized:false
    },
    getters: {},
    mutations: {
        addUser(state, user) {
            state.user.push(user);
        },
        setCurrentUser(state, user){
            for(let key in user[0]) {
                Vue.set(state.currentUser, key, user[0][key]);
            }
        },
        switchAuthorization(state){
            state.authorized=!state.authorized;
        }
    }
});