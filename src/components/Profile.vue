<template>
    <div class="profile container">
        <div class="text-success">{{ message }}</div>
        <form class="profile__form">
            <div class="form-group">
                <label for="name">Имя</label>
                <input v-model="properties.name" @change="checkEmpty('name', 'Поле Имя не должно быть пустым')"
                       type="text" :class="[{'is-invalid':invalid.name}, 'form-control']"
                       id="name" placeholder="Введите имя">
                <div class="invalid-feedback">
                    {{ errors.name }}
                </div>
            </div>
            <div class="form-group">
                <label for="surname">Фамилия</label>
                <input v-model="properties.surname"
                       @change="checkEmpty('surname', 'Поле Фамилия не должно быть пустым')" type="text"
                       :class="[{'is-invalid':invalid.surname}, 'form-control']" id="surname"
                       placeholder="Введите фамилию">
                <div class="invalid-feedback">
                    {{ errors.surname }}
                </div>
            </div>
            <div class="form-group">
                <label for="patronymic">Отчество</label>
                <input v-model="properties.patronymic"
                       @change="checkEmpty('patronymic', 'Поле Отчество не должно быть пустым')" type="text"
                       :class="[{'is-invalid':invalid.patronymic}, 'form-control']" id="patronymic"
                       placeholder="Введите отчество">
                <div class="invalid-feedback">
                    {{ errors.patronymic }}
                </div>
            </div>
            <div class="form-group">
                <label for="age">Возраст</label>
                <input v-model="properties.age" @change="checkAge" type="number"
                       :class="[{'is-invalid':invalid.age}, 'form-control']"
                       id="age" min="0" placeholder="Введите возраст">
                <div class="invalid-feedback">
                    {{ errors.age }}
                </div>
            </div>
            <button @click.prevent="saveChanges" class="btn btn-primary btn-block m-auto">Изменить</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Profile",
        data() {
            return {
                properties: {
                    name: this.$store.state.currentUser.name,
                    surname: this.$store.state.currentUser.surname,
                    patronymic: this.$store.state.currentUser.patronymic,
                    age: this.$store.state.currentUser.age
                },
                errors: {
                    name: "",
                    surname: "",
                    patronymic: "",
                    age: ""
                },
                invalid: {
                    name: false,
                    surname: false,
                    patronymic: false,
                    age: false
                },
                message: ""
            }
        },
        methods: {
            saveChanges() {
                let app = this;
                let result = this.checkOnErrors();

                if (result.access) {
                    this.$store.commit("saveChangesProfile", this.properties);

                    app.message = result.msg;
                    setTimeout(function () {
                        app.message = "";
                    }, 3000);
                }
                console.log(result.msg);
            },
            checkOnErrors() {
                if (this.properties.name === "") return {access: false, msg: "Пустое поле Имя"};
                if (this.properties.surname === "") return {access: false, msg: "Пустое поле Фамилия"};
                if (this.properties.patronymic === "") return {access: false, msg: "Пустое поле Отчество"};
                if (this.properties.age === "") return {access: false, msg: "Пустое поле Возраст"};
                if (this.properties.age <= 0) return {
                    access: false,
                    msg: "Возраст не может быть отрицателен или равен нулю"
                };
                return {access: true, msg: "Изменения применены"};
            },
            checkAge() {
                let empty = this.checkEmpty('age', 'Поле Возраст не должно быть пустым');
                if (!empty) {
                    if (this.properties.age <= 0) {
                        this.createError("age", "Возраст не может быть отрицательным или равен нулю");
                    }
                }
            },
            checkEmpty(name, msg) {
                if (this.properties[name].length === 0) {
                    this.createError(name, msg);
                    return true;
                }
                else {
                    this.invalid[name] = false;
                    return false;
                }
            },
            createError(name, msg) {
                this.errors[name] = msg;
                this.invalid[name] = true;
            }
        }
    }
</script>

<style scoped lang="scss">
    .profile {
        display: flex;
        height: calc(100vh - 40px);
        .profile__form {
            margin: auto;
            width: 350px;
        }
    }
</style>