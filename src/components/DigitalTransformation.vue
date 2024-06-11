<script setup>
import Vue3Autocounter from "vue3-autocounter";

const components = {
  Vue3Autocounter,
};

const counter = ref(null);
const teste = ref(false);

const visibilityChanged = (isVisible, entry) => {
  if (isVisible) {
    counter.value.start();
  }
};

const metrics = [
  {
    title: "projetos nos últimos 3 anos",
    number: 150,
  },
  {
    title: "clientes de diversas verticais",
    number: 20,
  },
  {
    title: "profissionais especializados",
    number: 135,
  },
  {
    title: "horas de projeto por ano",
    number: 140,
  },
];
</script>

<template>
  <div
    class="bg-digital flex flex-col gap-20 py-24 px-6 lg:px-4 xl:px-[8rem] 2xl:px-[15rem]"
  >
    <div class="flex flex-col items-center lg:flex-row gap-12 md:gap-[5.5rem]">
      <div class="flex flex-col gap-8">
        <h2
          class="text-orion-neutrals-500 text-orion-display-sm md:text-orion-display-lg font-semibold"
        >
          Jornadas Completas de Transformação Digital
        </h2>
        <p
          class="text-orion-neutrals-500 text-orion-title-md md:text-orion-headline-sm"
        >
          Desde 2014 apoiamos organizações de diversas indústrias a consolidarem
          suas estratégias de negócio com soluções que proporcionam experiências
          conectadas, workflows digitais e hiperautomação.<br />
          <br />
          Hoje com métricas que comprovam nosso sucesso, a orion deixa de ser uma
          unidade da Extreme Digital Solutions para se tornar uma empresa
          totalmente dedicada a evoluir a jornada digital de nossos clientes e
          parceiros.
        </p>
      </div>
      <div class="flex flex-col gap-8">
        <div
          class="flex items-center py-[1.22rem] px-[0.81rem] md:py-6 md:px-14 md:w-[24rem] md:h-[6.5rem] bg-dt border-b-4 border-orion-primary-500"
        >
          <p
            class="text-orion-title-md md:text-orion-title-lg text-orion-neutrals-500 font-semibold"
          >
            + Melhoria do atendimento ao cliente
          </p>
        </div>
        <div
          class="flex items-center py-[1.22rem] px-[0.81rem] md:py-6 md:px-14 md:w-[24rem] md:h-[6.5rem] bg-dt border-b-4 border-orion-primary-500"
        >
          <p
            class="text-orion-title-md md:text-orion-title-lg text-orion-neutrals-500 font-semibold"
          >
            + Otimização dos processos de negócio
          </p>
        </div>
        <div
          class="flex items-center py-[1.22rem] px-[0.81rem] md:py-6 md:px-14 md:w-[24rem] md:h-[6.5rem] bg-dt border-b-4 border-orion-primary-500"
        >
          <p
            class="text-orion-title-md md:text-orion-title-lg text-orion-neutrals-500 font-semibold"
          >
            + Redução de custos
          </p>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 gap-y-10">
      <div
        v-for="(metric, index) in metrics"
        :key="index"
        class="col-span-4 md:col-span-4 lg:col-span-3 mx-auto"
      >
        <div
          class="flex flex-col flex-wrap justify-start items-center p-6 border-b-4 bg-dt min-w-[20rem] md:min-w-0 h-34 border-orion-primary-500 max-w-[14.375rem] text-center md:h-[12.5rem]"
        >
          <h3
            class="text-orion-display-md md:text-orion-display-3xl text-orion-primary-500 font-medium"
          >
            {{ "+" + metric.number }}
            <span
              class="text-orion-title-lg ml-[-14px]"
              v-if="metric.number === 140"
              >mil</span
            >
          </h3>
          <p
            class="text-orion-title-sm md:text-orion-title-md text-orion-neutrals-500 font-medium"
          >
            {{ metric.title }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.bg-digital {
  background-image: url("/src/assets/bgs/bgservice.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}

.bg-dt {
  background-color: rgba(35, 31, 32, 0.5);
}
</style>
