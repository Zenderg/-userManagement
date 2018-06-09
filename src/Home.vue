<template>
    <div class="main">
        <div v-if="this.$store.state.authorized" class="inf"><h2>Управление пользователями</h2></div>
        <div v-if="!this.$store.state.authorized" class="login">
            <form class="login__form">
                <div class="form-group">
                    <label for="email">Email address</label>
                    <input v-model="email" type="email" class="form-control" id="email" placeholder="Enter email">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input v-model="password" type="password" class="form-control" id="password" placeholder="Password">
                    <small class="form-text text-muted">
                        Must not be shorter than 5 characters</small>
                </div>
                <button @click.prevent="sendForm" class="btn btn-primary btn-block">LOGIN</button>
            </form>
        </div>
    </div>

</template>
<script>
export default {
  name: 'home',
  data () {
    return {
        email:"",
        password:""
    }
  },
    methods:{
        sendForm(){
            let arr=this.$store.state.users;
            let user = arr.filter(this.findUser);
            let valid=this.checkValid(user);
            if(valid){
                console.log("Вход...");
                this.$store.commit("switchAuthorization");
                this.$store.commit("setCurrentUser", user);
                this.$router.push('profile');
            }
        },
        findUser(user){
            if(user.email===this.email){
                return user;
            }
        },
        checkValid(user){
            return user[0].password === this.password;
        }
    },
}
</script>

<style scoped lang="scss">
    .inf{
        height: calc(100vh - 40px);
        display: flex;
        h2{
            margin: auto;
        }
    }
    .login{
        display: flex;
        height: calc(100vh - 40px);
        .login__form{
            width: 300px;
            margin: auto;
        }
    }
</style>
