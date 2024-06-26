<script setup>
const reasons = [
  {
    title: 'Personal Training',
    description: 'Nossa academia oferece sessões de treinamentos com profissionais qualificados quem criam planos customaizados nas invidualidades de cada um.',
  },
  {
    title: 'Equipamentos e Ambiente',
    description: 'Nossa academia oferece uma vasta gama de equipamentos de alta qualidade e um ambiente agradável, espaçoso e adaptado para treino.',
  },
  {
    title: 'Plano Alimentar',
    description: 'Nossa academia oferece um plano alimentar personalizado para cada aluno, com o objetivo de atingir os resultados desejados.',
  },
  {
    title: 'Planos',
    description: 'Nossa academia oferece planos flexíveis e adaptáveis para cada aluno, para que todas as pessoas possam treinar conosco.',
  }
]
</script>

<template>
  <div class="bg-orion-secondary-500 py-10 flex flex-col justify-center items-center px-8 lg:px-20">
    <h2 class="text-orion-secondary-50 text-orion-display-lg ">
      Porque <span class="text-orion-primary-500">nós</span>
    </h2>
    <div class="max-w-[30rem] text-center">
      <p class="text-orion-secondary-50 text-orion-title-md">Nossos treinos oferecem versatibilidade e uma experiência customizada, sempre voltada para os objtivos específicos de cada aluno.</p>
    </div>
    <div class="grid grid-cols-12 gap-4 lg:gap-20 mt-12">
        <div v-for="(reason, index) in reasons" :key="index" class="p-8 border border-orion-primary-500 col-span-12 lg:col-span-6">
          <p class="text-orion-secondary-50 text-orion-headline-md">0{{ index }}</p>
          <div>
            <h2 class="text-orion-primary-500 text-orion-headline-sm">{{ reason.title }}</h2>
            <p class="text-orion-secondary-50">{{ reason.description }}</p>
          </div>
        </div>

    </div>
  </div>
</template>

