<template>
     <div>
         <button class="btn btn-primary mb-3 mt-3">Add User</button>
         <table class="table">
             <tr>
                 <th>Name</th>
                 <th>Surname</th>
                 <th>Patronymic</th>
                 <th>Age</th>
                 <th>Actions</th>
             </tr>
             <tr>
                 <td>Админ</td>
                 <td>Админ</td>
                 <td>Админ</td>
                 <td>Админ</td>
                 <td>
                     <button class="btn btn-sm"></button>
                     <button class="btn btn-sm"></button>
                 </td>
             </tr>
         </table>
     </div>
</template>

<script>
    export default {
        name: "Users"
    }
</script>

<style scoped>

</style>