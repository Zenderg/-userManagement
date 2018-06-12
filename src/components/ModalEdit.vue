<template>
    <modal @confirm="confirmEdit(dataEdit)" @close="$emit('close')">
        <h4 slot="header">Изменение пользователя</h4>
        <form slot="body">
            <div class="form-group">
                <label for="nameEdit">Имя</label>
                <input v-model="dataEdit.name" type="text"
                       @change="checkEmpty('name', 'Поле Имя не должно быть пустым')"
                       :class="[{'is-invalid':invalid.name}, 'form-control']" id="nameEdit" placeholder="Enter name">
                <div class="invalid-feedback">
                    {{ errors.name }}
                </div>
            </div>
            <div class="form-group">
                <label for="surnameEdit">Фамилия</label>
                <input v-model="dataEdit.surname" @change="checkEmpty('surname', 'Поле Фамилия не должно быть пустым')"
                       type="text" :class="[{'is-invalid':invalid.surname}, 'form-control']" id="surnameEdit"
                       placeholder="Enter surname">
                <div class="invalid-feedback">
                    {{ errors.surname }}
                </div>
            </div>
            <div class="form-group">
                <label for="patronymicEdit">Отчество</label>
                <input v-model="dataEdit.patronymic"
                       @change="checkEmpty('patronymic', 'Поле Отчество не должно быть пустым')" type="text"
                       :class="[{'is-invalid':invalid.patronymic}, 'form-control']" id="patronymicEdit"
                       placeholder="Enter patronymic">
                <div class="invalid-feedback">
                    {{ errors.patronymic }}
                </div>
            </div>
            <div class="form-group">
                <label for="ageEdit">Возраст</label>
                <input v-model="dataEdit.age" @change="checkAge" type="number"
                       :class="[{'is-invalid':invalid.age}, 'form-control']" id="ageEdit" min="0">
                <div class="invalid-feedback">
                    {{ errors.age }}
                </div>
            </div>
        </form>
    </modal>
</template>

<script>
    import Modal from "./Modal.vue";

    export default {
        name: "ModalEdit",
        data() {
            return {
                dataEdit: {
                    name: this.$store.state.editUser.name,
                    surname: this.$store.state.editUser.surname,
                    patronymic: this.$store.state.editUser.patronymic,
                    age: this.$store.state.editUser.age,
                    email: this.$store.state.editUser.email
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
                }
            }
        },
        methods: {
            confirmEdit(dataEdit) {
                let result = this.checkOnErrors();

                if (result.access) {
                    this.$store.commit("saveChangesUser", dataEdit);
                    this.$emit('close');
                }
                console.log(result.msg);
            },
            checkOnErrors() {
                if (this.dataEdit.name === "") return {access: false, msg: "Пустое поле Имя"};
                if (this.dataEdit.surname === "") return {access: false, msg: "Пустое поле Фамилия"};
                if (this.dataEdit.patronymic === "") return {access: false, msg: "Пустое поле Отчество"};
                if (this.dataEdit.age === "") return {access: false, msg: "Пустое поле Возраст"};
                if (this.dataEdit.age <= 0) return {access: false, msg: "Возраст отрицателен или равен нулю"};
                return {access: true, msg: "Изменения применены"};
            },
            checkAge() {
                let empty = this.checkEmpty('age', 'Поле Возраст не должно быть пустым');
                if (!empty) {
                    if (this.dataEdit.age <= 0) {
                        this.createError("age", "Возраст не может быть отрицательным или равен нулю");
                    }
                }
            },
            createError(name, msg) {
                this.errors[name] = msg;
                this.invalid[name] = true;
            },
            checkEmpty(name, msg) {
                if (this.dataEdit[name].length === 0) {
                    this.createError(name, msg);
                    return true;
                }
                else {
                    this.invalid[name] = false;
                    return false;
                }
            },
        },
        components: {
            Modal
        }
    }
</script>

<style scoped>

</style>