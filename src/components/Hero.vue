<script setup>
const scrollToId = inject("scrollToId");
// const params = new URLSearchParams(window.location.search);
// const name = params.get("utm_campaign");
</script>

<template>
  <div class="bg-hero">
    <div class="flex justify-between lg:gap-8 px-6 lg:px-[4rem] xl:px-[8rem]">
      <div class="flex w-full justify-between pt-44 pb-12 md:pt-80 md:pb-32">
        <div class="flex my-auto flex-col max-w-[40.93rem] mr-8">
          <div>
            <h1
              class="text-orion-display-sm md:text-orion-display-2xl font-semibold md:font-medium text-orion-neutrals-500"
            >
              Pronto para alcançar sua melhor versão?
            </h1>
            <div
              class="mt-6 mb-12 text-orion-title-md md:text-orion-headline-md text-orion-neutrals-500"
            >
              Com nossa estrutura de ponta, estamos prontos para te ajudar a conquistar seu corpo dos sonhos. Possuindo profissionais de extrema qualificação e equipamentos de ponta.
            </div>
          </div>
          <div class="flex gap-[1.44rem]">
            <button
              class="bg-transparent text-orion-neutrals-500 px-4 py-[0.88rem] border-[1.5px] border-orion-neutrals-500 text-orion-label-sm font-medium hover:bg-orion-primary-500 hover:text-orion-secondary-50 hover:border-transparent transition duration-200"
              @click="scrollToId('#whyus')"
            >
              Conheça nossos serviços
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.bg-hero {
  background-image: url("/src/assets/bgs/hero.png");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
