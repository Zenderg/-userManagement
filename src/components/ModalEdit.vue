<template>
    <modal @confirm="confirmEdit(dataEdit)" @close="$emit('close')">
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
</template>

<script>
    import Modal from "./Modal.vue";

    export default {
        name: "ModalEdit",
        data(){
            return{
                dataEdit:{
                    name:this.$store.state.editUser.name,
                    surname:this.$store.state.editUser.surname,
                    patronymic:this.$store.state.editUser.patronymic,
                    age:this.$store.state.editUser.age,
                    email:this.$store.state.editUser.email
                }
            }
        },
        methods:{
            confirmEdit(dataEdit){
                this.$store.commit("saveChangesUser", dataEdit);
            }
        },
        components:{
            Modal
        }
    }
</script>

<style scoped>

</style>