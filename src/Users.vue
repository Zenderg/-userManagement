<template>
     <div class="container">
         <button class="btn btn-primary mb-3 mt-3">Add User</button>
         <table class="table">
             <tr>
                 <th>Name</th>
                 <th>Surname</th>
                 <th>Patronymic</th>
                 <th>Age</th>
                 <th>Actions</th>
             </tr>
             <tr v-for="user in users">
                 <td>{{ user.name }}</td>
                 <td>{{ user.surname }}</td>
                 <td>{{ user.patronymic }}</td>
                 <td>{{ user.age }}</td>
                 <td>
                     <button class="btn btn-sm btn-warning">Edit</button>
                     <button v-if="currentUser.email!==user.email" class="btn btn-sm btn-danger">Delete</button>
                 </td>
             </tr>
         </table>
     </div>
</template>

<script>
    export default {
        name: "Users",
        data() {
            return {
                users: this.$store.state.users,
                currentUser: this.$store.state.currentUser
            }
        }
    }
</script>

<style scoped>

</style>