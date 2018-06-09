<template>
    <div class="profile">
        <form class="profile__form">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" placeholder="Enter name">
            </div>
            <div class="form-group">
                <label for="surname">Surname</label>
                <input type="text" class="form-control" id="surname" placeholder="Enter surname">
            </div>
            <div class="form-group">
                <label for="patronymic">Patronymic</label>
                <input type="text" class="form-control" id="patronymic" placeholder="Enter patronymic">
            </div>
            <div class="form-group">
                <label for="age">Age</label>
                <input type="number" class="form-control" id="age" min="0">
            </div>
            <button type="submit" class="btn btn-primary btn-block m-auto">Change</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Profile"
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