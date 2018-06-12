import Vue from "vue";

export const mutations = {
    addUser(state, user) {
        state.users.push(user);
    },
    setCurrentUser(state, user) {
        for (let key in user[0]) {
            Vue.set(state.currentUser, key, user[0][key]);
        }
    },
    switchAuthorization(state) {
        state.authorized = !state.authorized;
    },
    saveChangesUser(state, user) {
        user.age = parseInt(user.age, 10);
        let index = findUserIndexByEmail(state.users, user.email);

        if (user.email === state.currentUser.email) {
            for (let key in user) {
                Vue.set(state.currentUser, key, user[key]);
            }
        }

        for (let key in user) {
            Vue.set(state.users[index], key, user[key]);
        }
    },
    saveChangesProfile(state, user) {
        user.age = parseInt(user.age, 10);
        for (let key in user) {
            Vue.set(state.currentUser, key, user[key]);
        }

        let index = findUserIndexByEmail(state.users, state.currentUser.email);

        for (let key in user) {
            Vue.set(state.users[index], key, user[key]);
        }
    },
    deleteUser(state, email) {
        let index = findUserIndexByEmail(state.users, email);
        state.users.splice(index, 1);
    }
};

function findUserIndexByEmail(users, email) {
    //нахождение индекса пользователя в массиве всех пользователей по email
    return users.findIndex(function (element) {
        if (element.email === email) {
            return true;
        }
    });
}