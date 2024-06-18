<script setup>
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

const personals = [
  {
    name: "Maria Joaquina",
    rate: 4,
    src: "src/assets/personals/Image.png",
  },
  {
    name: "Joãozinho",
    rate: 3,
    src: "src/assets/personals/Image2.png",
  },
  {
    name: "Mariazinha",
    rate: 2,
    src: "src/assets/personals/Image3.png",
  },
  {
    name: "Joãozinha",
    rate: 1,
    src: "src/assets/personals/Image4.png",
  }
]
</script>

<template>
  <div class="bg-orion-secondary-700 py-10 flex flex-col justify-center items-center px-20">
    <div class="max-w-[30rem] text-center">
      <h2 class="text-orion-secondary-50 text-orion-display-lg leading-10">
        Nossos Personais 
      </h2>
      <span class="text-orion-primary-500  text-orion-display-lg ">Trainers</span>
    </div>

    <div class="max-w-[30rem] text-center mt-5">
      <p class="text-orion-secondary-50 text-orion-title-md">Descubra treinos únicos e personalizados, projetados para alcançar seus objetivos individuais com precisão e paixão.
      </p>
    </div>
    <div>
      <Carousel
      :items-to-show="3"
      class="flex justify-center gap-20 px-10 lg:px-[4rem]"
      ref="carousel"
      v-model="currentSlide"
      snapAlign="center"
      :wrap-around="false"
    >
      <Slide v-for="(personal, index) in personals" :key="index" class="">
        <div :style="{ backgroundImage: `url(${personal.src})` }" class="flex flex-col justify-end carousel__item items-center bg-cover bg-center w-[388px] h-[536px]">
          <span class="text-orion-secondary-50 text-orion-display-sm">{{ personal.name }}</span>
          
        </div>
      </Slide>
      <template #addons>
        <Navigation class="2xl:mx-32" />
      </template>
    </Carousel>
    </div>
  </div>
</template>

.bg-digital {
  background-image: url("/src/assets/bgs/bgservice.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}
