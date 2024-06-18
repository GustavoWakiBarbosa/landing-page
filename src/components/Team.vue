<script setup>
const isMobile = ref(false);

onMounted(() => {
  if (window.innerWidth < 768) {
    isMobile.value = true;
  }
});
</script>
<template>
  <div
    class="flex flex-col justify-center items-center flex-wrap gap-12 px-[2rem] lg:px-[4rem] xl:px-[18rem] py-24"
  >
    <div class="text-left">
      <h2 class="text-orion-secondary-500 text-orion-display-sm font-semibold mb-4">
        Faça parte do nosso time
      </h2>
      <h3 class="text-orion-secondary-300 text-orion-headline-sm">
        Interessado em trabalhar conosco? Clique abaixo e fique por dentro das
        nossas vagas e oportunidades.
      </h3>
    </div>
    <div>
      <a
        href="https://linkedin.com/company/extremedigitalsolutions/jobs"
        target="_blank"
      >
        <button
          class="py-[0.88rem] px-4 border border-orion-secondary-500 hover:bg-orion-primary-500 hover:text-orion-secondary-50 hover:border-transparent font-medium text-orion-secondary-500 transition duration-200"
        >
          Ver vagas
        </button>
      </a>
    </div>
    <div class="flex justify-center flex-wrap gap-6">
      <img src="/src/assets/team/team1.png" alt="" class="object-none" />
      <img src="/src/assets/team/team2.png" alt="" class="object-none" />
      <img
        src="/src/assets/team/team3.png"
        alt=""
        class="hidden md:block object-none"
      />
      <img
        src="/src/assets/team/team4.png"
        alt=""
        class="hidden md:block object-none"
      />
    </div>
  </div>
</template>
