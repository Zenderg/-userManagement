<template>
    <modal @confirm="confirmAdd" @close="$emit('close')">
        <h4 slot="header">Добавление пользователя</h4>
        <form slot="body">
            <div class="form-group">
                <label for="nameAdd">Имя</label>
                <input v-model="dataAdd.name" @change="changeInput('name')" type="text"
                       :class="[{'is-invalid':invalid.name}, 'form-control']" id="nameAdd" placeholder="Введите имя">
                <div class="invalid-feedback">
                    {{ errors.name }}
                </div>
            </div>
            <div class="form-group">
                <label for="surnameAdd">Фамилия</label>
                <input v-model="dataAdd.surname" @change="changeInput('surname')" type="text"
                       :class="[{'is-invalid':invalid.surname}, 'form-control']" id="surnameAdd"
                       placeholder="Введите Фамилию">
                <div class="invalid-feedback">
                    {{ errors.surname }}
                </div>
            </div>
            <div class="form-group">
                <label for="patronymicAdd">Отчество</label>
                <input v-model="dataAdd.patronymic" @change="changeInput('patronymic')" type="text"
                       :class="[{'is-invalid':invalid.patronymic}, 'form-control']" id="patronymicAdd"
                       placeholder="Введите отчество">
                <div class="invalid-feedback">
                    {{ errors.patronymic }}
                </div>
            </div>
            <div class="form-group">
                <label for="ageAdd">Возраст</label>
                <input v-model="dataAdd.age" @change="changeInput('age')" type="number"
                       :class="[{'is-invalid':invalid.age}, 'form-control']" id="ageAdd" min="0"
                       placeholder="Введите возраст">
                <div class="invalid-feedback">
                    {{ errors.age }}
                </div>
            </div>
            <div class="form-group">
                <label for="emailAdd">Email</label>
                <input v-model="dataAdd.email" @change="changeInput('email')" type="email"
                       :class="[{'is-invalid':invalid.email}, 'form-control']" id="emailAdd"
                       placeholder="Введите email">
                <div class="invalid-feedback">
                    {{ errors.email }}
                </div>
            </div>
            <div class="form-group">
                <label for="passwordAdd">Пароль</label>
                <input v-model="dataAdd.password" @change="changeInput('password')" type="password"
                       :class="[{'is-invalid':invalid.password}, 'form-control']" id="passwordAdd"
                       placeholder="Пароль">
                <small class="form-text text-muted">
                    Должен быть не менее {{ $store.state.minPasswordLength }} символов
                </small>
                <div class="invalid-feedback">
                    {{ errors.password }}
                </div>
            </div>
        </form>
    </modal>
</template>

<script>
    import Modal from "./Modal.vue";

    export default {
        name: "ModalAdd",
        data() {
            return {
                dataAdd: {
                    name: "",
                    surname: "",
                    patronymic: "",
                    age: null,
                    email: "",
                    password: ""
                },
                errors: {
                    name: "",
                    surname: "",
                    patronymic: "",
                    age: "",
                    email: "",
                    password: ""
                },
                invalid: {
                    name: false,
                    surname: false,
                    patronymic: false,
                    age: false,
                    email: false,
                    password: false
                }
            }
        },
        methods: {
            confirmAdd() {
                let result = this.checkOnErrors();
                if (result) {
                    this.$store.commit("addUser", this.dataAdd);
                    this.$emit('close');
                }
            },
            checkOnErrors() {
                if (this.dataAdd.name.length === 0) {
                    this.errors.name = 'Поле Имя не должно быть пустым';
                }

                if (this.dataAdd.surname.length === 0) {
                    this.errors.surname = 'Поле Фамилия не должно быть пустым';
                }

                if (this.dataAdd.patronymic.length === 0) {
                    this.errors.patronymic = 'Поле Отчество не должно быть пустым';
                }

                let age = this.checkAge();
                if (age.length !== 0) this.errors.age = age;

                let email = this.checkEmail();
                if (email.length !== 0) this.errors.email = email;

                let password = this.checkPassword();
                if (password.length !== 0) {
                    this.errors.password = password;
                }

                return this.assignErrors();
            },
            assignErrors() {
                let access = true;

                for (let key in this.errors) {

                    if (this.errors[key].length !== 0) {
                        access = false;
                        this.invalid[key] = true;
                    }
                }

                return access;
            },
            checkAge() {
                this.dataAdd.age = parseInt(this.dataAdd.age, 10);
                let age = this.dataAdd.age;

                if (!isNaN(age)) {
                    if (age <= 0) {
                        return "Возраст не может быть отрицателен или равен нулю";
                    }
                }
                else return "Поле Возраст не должно быть пустым";
                return "";
            },
            checkPassword() {
                let password = this.dataAdd.password;
                if (password.length < this.$store.state.minPasswordLength) {
                    return "Пароль должен быть не менее " + this.$store.state.minPasswordLength + " символов";
                }

                return "";
            },
            checkEmail() {
                let accuracy = this.dataAdd.email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
                if (!accuracy) return "Некорректный email";

                if (this.findEmail().length) return "Email уже существует";

                return "";
            },
            findEmail() {
                let app = this;
                let arr = this.$store.state.users;

                return arr.filter(function (user) {
                    if (user.email === app.dataAdd.email) return user;
                });
            },
            changeInput(name) {
                this.errors[name] = "";
                this.invalid[name] = false;
            }
        },
        components: {
            Modal
        }
    }
</script>

<style scoped>

</style>