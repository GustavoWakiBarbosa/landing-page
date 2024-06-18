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
const currentSlide = ref(0);

const posts = ref([
  {
    src: "/src/assets/Blog.png",
    title: "Digital Experience Business Unit e ServiceNow",
    description:
      "O grande desafio foi implementar tecnologias capazes de otimizar os processos da empresa, expandindo suas capacidades, aumentando a eficiência nos atendimentos...",
    link: "",
    arrow: false,
  },
  {
    src: "/src/assets/Blog.png",
    title: "Digital Experience Business Unit e ServiceNow",
    description:
      "O grande desafio foi implementar tecnologias capazes de otimizar os processos da empresa, expandindo suas capacidades, aumentando a eficiência nos atendimentos...",
    link: "",
    arrow: false,
  },
  {
    src: "/src/assets/Blog.png",
    title: "Digital Experience Business Unit e ServiceNow",
    description:
      "O grande desafio foi implementar tecnologias capazes de otimizar os processos da empresa, expandindo suas capacidades, aumentando a eficiência nos atendimentos...",
    link: "",
    arrow: false,
  },
]);

const hoverArrow = ref(false);
</script>

<template>
  <div class="bg-orion-primary-50 px-6 py-24">
    <h2
      class="mb-4 text-orion-secondary-500 font-semibold text-orion-display-sm md:text-center"
    >
      Fique por dentro dos últimos eventos e notícias
    </h2>
    <p class="mb-16 text-orion-headline-md text-orion-secondary-300 md:text-center">
      Notícias, Eventos, Insights, Cases no nosso blog
    </p>
    <div
      class="hidden md:flex justify-center gap-8 px-[2rem] lg:px-[4rem] xl:px-[8rem]"
    >
      <div v-for="(post, index) in posts" :key="index" class="">
        <div class="flex flex-col flex-wrap content-center max-w-[24rem]">
          <img :src="post.src" alt="" />
          <div class="p-6">
            <h3
              class="text-orion-title-lg text-orion-secundary-500 font-semibold mb-4"
            >
              {{ post.title }}
            </h3>
            <h4 class="text-orion-title-sm text-orion-secundary-500 mb-4">
              {{ post.description }}
            </h4>
            <div
              class="inline-block"
              @mouseover="post.arrow = true"
              @mouseleave="post.arrow = false"
            >
              <div
                class="flex gap-2 border-b-2 border-orion-secondary-500 mt-8 hoverwrap hover:border-orion-primary-500 transition-all duration-200"
              >
                <p
                  class="text-orion-title-sm text-orion-secondary-500 font-semibold textBlue transition-all duration-200"
                >
                  Continuar lendo
                </p>
                <img
                  v-if="post.arrow"
                  src="/src/assets/arrow.svg"
                  class="w-4 fill-orion-primary-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Carousel
      :items-to-show="1"
      class="md:hidden flex"
      ref="carousel"
      v-model="currentSlide"
      snapAlign="start"
    >
      <Slide v-for="(post, index) in posts" :key="index" class="bg-white">
        <div class="flex flex-col flex-wrap content-center max-w-[24rem]">
          <img :src="post.src" alt="" />
          <div class="flex flex-col justify-start p-6">
            <h3
              class="text-orion-title-lg text-left text-orion-secondary-500 font-semibold mb-4"
            >
              {{ post.title }}
            </h3>
            <h4 class="text-orion-title-sm text-left text-orion-secondary-500 mb-4">
              {{ post.description }}
            </h4>
            <div
              class="flex"
              @mouseover="post.arrow = true"
              @mouseleave="post.arrow = false"
            >
              <div
                class="flex gap-2 border-b-2 border-orion-secondary-500 mt-8 hoverwrap hover:border-orion-primary-500 transition-all duration-200"
              >
                <p
                  class="text-orion-title-sm text-orion-secondary-500 font-semibold textBlue transition-all duration-200"
                >
                  Continuar lendo
                </p>
                <img
                  v-if="post.arrow"
                  src="/src/assets/arrow.svg"
                  class="w-4 fill-orion-primary-500"
                />
              </div>
            </div>
          </div>
        </div>
      </Slide>
    </Carousel>
    <div class="md:hidden flex gap-2 justify-center mt-12">
      <div
        v-for="i in posts.length"
        :key="i"
        class="w-[2.875rem] h-[0.25rem] transition-all duration-300"
        :class="
          currentSlide == i - 1 ? 'bg-orion-primary-500' : 'bg-orion-primary-300'
        "
      ></div>
    </div>
  </div>
</template>

<style>
.hoverwrap:hover .textBlue {
  color: #203aec;
}
</style>
