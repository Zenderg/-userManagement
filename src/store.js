import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import {mutations} from "./mutations";

export const store = new Vuex.Store({
    state: {
        users: [
            {
                name: "Admin",
                surname: "Admin",
                patronymic: "Admin",
                age: 42,
                email: "admin@admin.com",
                password: "admin"
            },
            {
                name: "Иван",
                surname: "Токарев",
                patronymic: "Анатольевич",
                age: 35,
                email: "ivan@mail.ru",
                password: "ivan"
            },
            {
                name: "Максим",
                surname: "Кузнецов",
                patronymic: "Валерьевич",
                age: 26,
                email: "maxim@gmail.com",
                password: "maxim"
            },
            {
                name: "Анна",
                surname: "Шишкина",
                patronymic: "Сергеевна",
                age: 70,
                email: "ann@list.ru",
                password: "anna70"
            },
            {
                name: "Геральд",
                surname: "Белый волк",
                patronymic: "Из Ривии",
                age: 65,
                email: "herald@rivia.wolf",
                password: "unicorn"
            }
        ],
        currentUser: {name: "", surname: "", patronymic: "", age: 0, email: "", password: ""},
        editUser: {name: "", surname: "", patronymic: "", age: 0, email: ""},
        minPasswordLength: 5,
        authorized: false
    },
    mutations: mutations
});