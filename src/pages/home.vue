<script setup>
const alunos = [
  {
    name: 'João',
    email: 'joao@gmail.com'
  },
  {
    name: 'Maria',
    email: 'maria@gmail.com'
  },
  {
    name: 'José',
    email: 'jose@gmail.com'
  }
]
</script>

<template>
<div class="bg-orion-secondary-500 py-10 flex flex-col justify-center items-center px-8 lg:px-20 h-screen">
  <h2 class="text-orion-secondary-50 text-orion-display-lg ">
    Todos alunos
  </h2>
  <div v-for="(aluno,index) in alunos" :key="index" class="bg-orion-neutrals-300 rounded-md min-w-[200px] p-4 my-2">
    <p class=" text-orion-title-md">Nome: {{aluno.name}}</p>
    <p class=" text-orion-title-md">Email: {{aluno.email}}</p>
  </div>
</div>
</template>