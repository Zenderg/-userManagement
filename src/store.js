import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import {mutations} from "./mutations";

export const store = new Vuex.Store({
    state:{
        users:[
            {name:"Admin0",surname:"Admin",patronymic:"Admin",age:42,email:"admin@admin.com",password:"admin"},
            {name:"Admin1",surname:"Admin",patronymic:"Admin",age:43,email:"admin@adm.com",password:"admin"},
            {name:"Admin2",surname:"Admin",patronymic:"Admin",age:43,email:"admn@adm.com",password:"admin"},
            {name:"Admin3",surname:"Admin",patronymic:"Admin",age:43,email:"dmin@adm.com",password:"admin"},
            {name:"Admin4",surname:"Admin",patronymic:"Admin",age:43,email:"amin@adm.com",password:"admin"}
        ],
        currentUser:{name:"",surname:"",patronymic:"",age:0,email:"",password:""},
        editUser:{name:"",surname:"",patronymic:"",age:0,email:""},
        authorized:false
    },
    mutations: mutations
});