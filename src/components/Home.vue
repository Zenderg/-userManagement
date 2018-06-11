<template>
    <div class="main">
        <div v-if="this.$store.state.authorized" class="inf"><h2>Управление пользователями</h2></div>
        <div v-if="!this.$store.state.authorized" class="login">
            <form class="login__form">
                <div class="form-group">
                    <label for="email">Email address</label>
                    <input v-model="email" @change="invalid.email=false" type="email"
                           :class="[{'is-invalid':invalid.email}, 'form-control']"
                           id="email" placeholder="Enter email">
                    <div class="invalid-feedback">
                        {{ errors.email }}
                    </div>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input v-model="password" @change="invalid.password=false" type="password"
                           :class="[{'is-invalid':invalid.password}, 'form-control']"
                           id="password" placeholder="Password">
                    <small class="form-text text-muted">
                        Must not be shorter than 5 characters
                    </small>
                    <div class="invalid-feedback">
                        {{ errors.password }}
                    </div>
                </div>
                <button @click.prevent="sendForm" class="btn btn-primary btn-block">LOGIN</button>
            </form>
        </div>
    </div>

</template>
<script>
    export default {
        name: 'home',
        data() {
            return {
                email: "",
                password: "",
                errors: {
                    email: "",
                    password: ""
                },
                invalid: {
                    email: false,
                    password: false
                }
            }
        },
        methods: {
            sendForm() {
                let result = this.checkOnErrors();

                if (result.access) {
                    console.log(result.msg);
                    this.valid(result.user);
                }
                else {
                    this.createError(result.name, result.msg);
                    console.log(result.msg);
                }
            },
            findUser(user) {
                if (user.email === this.email) return user;
            },
            valid(user) {
                console.log("Вход...");
                this.$store.commit("switchAuthorization");
                this.$store.commit("setCurrentUser", user);
                this.$router.push('profile');
            },
            checkPassword(user) {
                return user[0].password === this.password;
            },
            createError(name, msg) {
                this.errors[name] = msg;
                this.invalid[name] = true;
            },
            checkOnErrors() {
                //проверка длины пароля
                if (this.password.length < 5) {
                    return {access: false, msg: "Пароль должен быть длиннее 5 символов", name: "password"};
                }

                // проверка корректности email
                let accuracy = this.email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
                if (!accuracy){
                    return {access: false, msg: "Некоректный Email", name: "email"};
                }

                //поиск пользователя по email
                let user;
                if (!this.checkEmail().length) {
                    return {access: false, msg: "Email не найден", name: "email"};
                }
                else {
                    user = this.checkEmail();
                }

                // проверка пароля пользователя
                if (!this.checkPassword(user)) {
                    return {access: false, msg: "Неправильный пароль", name: "password"};
                }

                return {access: true, msg: "Доступ разрешен", user:user};
            },
            checkEmail() {
                let arr = this.$store.state.users;
                return arr.filter(this.findUser);
            }
        },
    }
</script>

<style scoped lang="scss">
    .inf {
        height: calc(100vh - 40px);
        display: flex;
        h2 {
            margin: auto;
        }
    }

    .login {
        display: flex;
        height: calc(100vh - 40px);
        .login__form {
            width: 300px;
            margin: auto;
        }
    }
</style>
