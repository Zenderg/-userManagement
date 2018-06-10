<template>
     <div class="container">
         <button id="show-modal" @click="showAdd = true" class="btn btn-primary mb-3 mt-3">Add User</button>
         <modal @confirm="confirmAdd(dataAdd)" v-if="showAdd" @close="showAdd = false">
             <h4 slot="header">Add user</h4>
             <form slot="body">
                 <div class="form-group">
                     <label for="nameAdd">Name</label>
                     <input v-model="dataAdd.name" type="text" class="form-control" id="nameAdd" placeholder="Enter name">
                 </div>
                 <div class="form-group">
                     <label for="surnameAdd">Surname</label>
                     <input v-model="dataAdd.surname" type="text" class="form-control" id="surnameAdd" placeholder="Enter surname">
                 </div>
                 <div class="form-group">
                     <label for="patronymicAdd">Patronymic</label>
                     <input v-model="dataAdd.patronymic" type="text" class="form-control" id="patronymicAdd"
                            placeholder="Enter patronymic">
                 </div>
                 <div class="form-group">
                     <label for="ageAdd">Age</label>
                     <input v-model="dataAdd.age" type="number" class="form-control" id="ageAdd" min="0">
                 </div>
                 <div class="form-group">
                     <label for="emailAdd">Email address</label>
                     <input v-model="dataAdd.email" type="email" class="form-control" id="emailAdd" placeholder="Enter email">
                 </div>
                 <div class="form-group">
                     <label for="passwordAdd">Password</label>
                     <input v-model="dataAdd.password" type="password" class="form-control" id="passwordAdd" placeholder="Password">
                     <small class="form-text text-muted">
                         Must not be shorter than 5 characters</small>
                 </div>
             </form>
         </modal>
         <modal @confirm="confirmEdit(dataEdit)" v-if="showEdit" @close="showEdit = false">
             <h4 slot="header">Edit User</h4>
             <form slot="body">
                 <div class="form-group">
                     <label for="nameEdit">Name</label>
                     <input v-model="dataEdit.name" type="text" class="form-control" id="nameEdit" placeholder="Enter name">
                 </div>
                 <div class="form-group">
                     <label for="surnameEdit">Surname</label>
                     <input v-model="dataEdit.surname" type="text" class="form-control" id="surnameEdit" placeholder="Enter surname">
                 </div>
                 <div class="form-group">
                     <label for="patronymicEdit">Patronymic</label>
                     <input v-model="dataEdit.patronymic" type="text" class="form-control" id="patronymicEdit"
                             placeholder="Enter patronymic">
                 </div>
                 <div class="form-group">
                     <label for="ageEdit">Age</label>
                     <input v-model="dataEdit.age"  type="number" class="form-control" id="ageEdit" min="0">
                 </div>
             </form>
         </modal>
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
    import Modal from "./Modal.vue";

    export default {
        name: "Users",
        data() {
            return {
                users: this.$store.state.users,
                currentUser: this.$store.state.currentUser,
                showAdd: false,
                showEdit: false,
                dataEdit:{
                    name:"",
                    surname:"",
                    patronymic:"",
                    age:0,
                    email:""
                },
                dataAdd:{
                    name:"",
                    surname:"",
                    patronymic:"",
                    age:0,
                    email:"",
                    password:""
                }
            }
        },
        methods:{
            addUser(){

            },
            editUser(email){
                this.showEdit = true;

                let index = this.users.findIndex(function (element) {
                    if (element.email === email) {
                        return true;
                    }
                });

                let user=this.users[index];
                this.fillDataEdit(user.name, user.surname, user.patronymic, user.age, user.email);
            },
            deleteUser(email){
                this.$store.commit("deleteUser", email);
            },
            fillDataEdit(name,surname, patronymic, age, email){
                this.dataEdit.name=name;
                this.dataEdit.surname=surname;
                this.dataEdit.patronymic=patronymic;
                this.dataEdit.age=age;
                this.dataEdit.email=email;
            },
            confirmEdit(dataEdit){
                this.$store.commit("saveChangesUser", dataEdit);
            },
            confirmAdd(dataAdd){
                this.$store.commit("addUser", dataAdd);
            }
        },
        components:{
            Modal
        }
    }
</script>

<style scoped>

</style>