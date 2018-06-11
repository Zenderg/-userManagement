<template>
    <div class="profile container">
        <div class="text-success">{{ message }}</div>
        <form class="profile__form">
            <div class="form-group">
                <label for="name">Name</label>
                <input v-model="properties.name" @change="checkEmpty('name', 'Поле Name не должно быть пустым')"
                       type="text" :class="[{'is-invalid':invalid.name}, 'form-control']"
                       id="name" placeholder="Enter name">
                <div class="invalid-feedback">
                    {{ errors.name }}
                </div>
            </div>
            <div class="form-group">
                <label for="surname">Surname</label>
                <input v-model="properties.surname"
                       @change="checkEmpty('surname', 'Поле Surname не должно быть пустым')" type="text"
                       :class="[{'is-invalid':invalid.surname}, 'form-control']" id="surname"
                       placeholder="Enter surname">
                <div class="invalid-feedback">
                    {{ errors.surname }}
                </div>
            </div>
            <div class="form-group">
                <label for="patronymic">Patronymic</label>
                <input v-model="properties.patronymic"
                       @change="checkEmpty('patronymic', 'Поле Patronymic не должно быть пустым')" type="text"
                       :class="[{'is-invalid':invalid.patronymic}, 'form-control']" id="patronymic"
                       placeholder="Enter patronymic">
                <div class="invalid-feedback">
                    {{ errors.patronymic }}
                </div>
            </div>
            <div class="form-group">
                <label for="age">Age</label>
                <input v-model="properties.age" @change="checkAge" type="number"
                       :class="[{'is-invalid':invalid.age}, 'form-control']"
                       id="age" min="0">
                <div class="invalid-feedback">
                    {{ errors.age }}
                </div>
            </div>
            <button @click.prevent="saveChanges" class="btn btn-primary btn-block m-auto">Change</button>
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
                // проверка имени
                if (this.properties.name === "") return {access: false, msg: "Пустое поле Name"};
                if (this.properties.surname === "") return {access: false, msg: "Пустое поле Surname"};
                if (this.properties.patronymic === "") return {access: false, msg: "Пустое поле Patronymic"};
                if (this.properties.age === "") return {access: false, msg: "Пустое поле Age"};
                if (this.properties.age <= 0) return {access: false, msg: "Возраст отрицателен или равн нулю"};
                return {access: true, msg: "Изменения применены"};
            },
            checkAge() {
                let empty = this.checkEmpty('age', 'Поле Age не должно быть пустым');
                if (!empty) {
                    if (this.properties.age <= 0) {
                        this.createError("age", "Возраст не может быть отрицательным или меньше нуля");
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