<script setup>
import { onMounted } from "vue";
import axios from 'axios'

// const alunos = [
//   {
//     name: 'João',
//     email: 'joao@gmail.com'
//   },
//   {
//     name: 'Maria',
//     email: 'maria@gmail.com'
//   },
//   {
//     name: 'José',
//     email: 'jose@gmail.com'
//   }
// ]

const alunos = ref()

const permission = ref(false)

onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    console.log('token:', token)
    const response = await axios.get(
      'http://localhost:8080/api/users/getAllUsers',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      }
    )
    if (response.status === 200) {
      alunos.value = response.data
      permission.value = true
    }else{
      router.push({ path: "/home" });
    }
    console.log('response:', response)

  } catch (error) {
    console.log('error:', error)
  } 
});
</script>

<template>
<div class="bg-orion-secondary-500 py-10 flex flex-col justify-center items-center px-8 lg:px-20 h-screen">
  <h2 v-if="permission" class="text-orion-secondary-50 text-orion-display-lg">
    Todos alunos
  </h2>
  <h2 v-else class="text-orion-secondary-50 text-orion-display-lg text-center">
    Desculpe! Mas seu usuário não tem permissão para acessar os alunos!
  </h2>
  <div v-if="permission" v-for="(aluno,index) in alunos" :key="index" class="bg-orion-neutrals-300 rounded-md min-w-[300px] p-4 my-2">
    <p class=" text-orion-title-md">Nome: {{aluno.name}}</p>
    <p class=" text-orion-title-md">Email: {{aluno.email}}</p>
  </div>
</div>
</template>