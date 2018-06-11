<template>
    <modal @confirm="confirmAdd(dataAdd)" @close="$emit('close')">
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
</template>

<script>
    import Modal from "./Modal.vue";

    export default {
        name: "ModalAdd",
        data(){
            return{
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