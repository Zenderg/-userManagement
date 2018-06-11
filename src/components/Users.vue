<template>
     <div class="container">
         <button id="show-modal" @click="showAdd = true" class="btn btn-primary mb-3 mt-3">Add User</button>
         <modal-add v-if="showAdd" @close="showAdd = false"></modal-add>
         <modal-edit v-if="showEdit" @close="showEdit = false"></modal-edit>
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
                     <button @click="editUser(user.email)" class="btn btn-sm btn-warning">Edit</button>
                     <button @click="deleteUser(user.email)" v-if="currentUser.email!==user.email" class="btn btn-sm btn-danger">Delete</button>
                 </td>
             </tr>
         </table>

     </div>
</template>

<script>
    import ModalEdit from "./ModalEdit.vue";
    import ModalAdd from "./ModalAdd.vue";

    export default {
        name: "Users",
        data() {
            return {
                users: this.$store.state.users,
                currentUser: this.$store.state.currentUser,
                showAdd: false,
                showEdit: false,
            }
        },
        methods:{
            editUser(email){
                this.showEdit = true;

                let index = this.users.findIndex(function (element) {
                    if (element.email === email) {
                        return true;
                    }
                });

                let user=this.users[index];
                for (let key in user) {
                    this.$set(this.$store.state.editUser, key, user[key]);
                }
            },
            deleteUser(email){
                this.$store.commit("deleteUser", email);
            }
        },
        components:{
            ModalEdit,
            ModalAdd
        }
    }
</script>

<style scoped>

</style>