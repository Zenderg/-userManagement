<template>
    <div class="main">
        <div class="container d-none">Управление пользователями</div>
        <div class="login">
            <form class="login__form">
                <div class="form-group">
                    <label for="email">Email address</label>
                    <input type="email" class="form-control" id="email" placeholder="Enter email">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Password">
                </div>
                <button type="submit" class="btn btn-primary btn-block">LOGIN</button>
            </form>
        </div>
    </div>

</template>
<script>
export default {
  name: 'home',
  data () {
    return {

    }
  }
}
</script>

<style scoped lang="scss">
    .login{
        display: flex;
        height: calc(100vh - 40px);
        .login__form{
            width: 300px;
            margin: auto;
        }
    }
</style>
