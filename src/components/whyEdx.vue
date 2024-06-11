<script setup>
import { defineComponent } from "vue";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

const components = {
  Carousel,
  Slide,
  Pagination,
  Navigation,
};

const carousel = ref(null);
const reasons = [
  {
    src: "/iconsReasons/reason1.svg",
    title: "Experiência em diversos setores",
    description:
      "Durante os últimos 3 anos, atendemos e colaboramos com diversas organizações de diferentes  setores, incluido: Varejo, Educação, Finanças, Manufatura, Governamental e Tech.",
  },
  {
    src: "/iconsReasons/reason2.svg",
    title: "Omnichannel e Experiência integrada",
    description:
      "Promovemos a integração de soluções com diversos canais de comunicação, com foco em resolver problemas com mais rapidez, implementando rastreabilidade, segurança e foco na experiência do usuário final.",
  },
  {
    src: "/iconsReasons/reason3.svg",
    title: "Consultoria especializada e implementação",
    description:
      "Atuamos de forma consultiva e com visão holística, solidificando a estratégia digital, oferecendo e implementando as melhores soluções integradas para os desafios de negócios dos nossos clientes.",
  },
  {
    src: "/iconsReasons/reason4.svg",
    title: "Parcerias Estratégicas",
    description:
      "Nossas parcerias estratégicas com os principais fabricantes de tecnologia nos permitem aprofundar, personalizar e customizar soluções que já funcionam e estão sendo utilizadas no mercado para nossos clientes.",
  },
];

const currentSlide = ref(0);

const next = () => {
  carousel.value.next();
};

const prev = () => {
  carousel.value.prev();
};
</script>

<template>
  <div class="px-6 lg:px-[4rem] xl:px-[8rem] bg-we py-24">
    <h2
      class="text-orion-display-sm md:text-orion-display-lg text-orion-secondary-500 font-semibold text-center mb-14 md:mb-20"
    >
      Por que a orion?
    </h2>
    <div class="hidden md:flex flex-wrap gap-8 justify-center">
      <div
        v-for="(reason, index) in reasons"
        :key="index"
        class="bg-orion-neutrals-300 p-8 max-w-[37rem] border-b-4 border-transparent hover:border-orion-primary-500 hover:shadow"
      >
        <div class="flex items-center gap-6 mb-12">
          <img :src="reason.src" class="object-none" />
          <h3 class="text-orion-headline-md text-orion-secondary-500 pr-20">
            {{ reason.title }}
          </h3>
        </div>
        <p class="text-orion-title-md text-orion-secondary-300">
          {{ reason.description }}
        </p>
      </div>
    </div>

    <div class="flex">
      <!-- <img
        @click="prev"
        src="/src/assets/Chevron.svg"
        class="transition-all duration-300 cursor-pointer"
      /> -->
      <Carousel
        :items-to-show="1"
        class="md:hidden flex"
        ref="carousel"
        v-model="currentSlide"
        snapAlign="start"
      >
        <Slide
          v-for="(reason, index) in reasons"
          :key="index"
          class="flex justify-between items-start flex-col flex-wrap p-4 bg-card text-left border-b-4 border-orion-primary-500"
        >
          <img :src="reason.src" class="object-none" />
          <h3 class="text-orion-headline-md text-orion-primary-500">
            {{ reason.title }}
          </h3>
          <p class="text-orion-title-md text-orion-secondary-300">
            {{ reason.description }}
          </p>
        </Slide>
      </Carousel>
      <!-- <img
        @click="next"
        src="/src/assets/Chevron.svg"
        class="scale-x-[-1] transition-all duration-300 cursor-pointer"
      /> -->
    </div>
    <div class="md:hidden flex gap-2 mt-8 justify-center">
      <div
        v-for="i in reasons.length"
        :key="i"
        class="w-8 h-[0.25rem] transition-all duration-300"
        :class="
          currentSlide == i - 1 ? 'bg-orion-primary-500' : 'bg-orion-primary-100'
        "
      ></div>
    </div>
  </div>
</template>

<style>
.shadow {
  box-shadow: 0px 2px 15px 4px rgba(0, 0, 0, 0.75);
}

.bg-card {
  background: rgba(254, 254, 254, 0.75);
}

.bg-we {
  background-image: url("/src/assets/bgs/bgwe.png");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
