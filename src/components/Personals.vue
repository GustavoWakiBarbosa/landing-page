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
        <div :style="{ backgroundImage: `url(${personal.src})` }" class="flex flex-col justify-end carousel__item items-center bg-cover bg-center w-[388px] h-[536px] border-2 border-orion-primary-500">
          <div class="bg-black bg-opacity-50 w-[100%] py-10">
            <span class="text-orion-secondary-50 text-orion-display-sm">{{ personal.name }}</span>
            <div class="flex gap-2 justify-center">
              <svg v-for="star in personal.rate" :key="star" height="24px" width="24px" version="1.1" id="Capa_1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 47.94 47.94" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style="fill:#ffd500;" d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757 c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042 c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685 c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528 c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956 C22.602,0.567,25.338,0.567,26.285,2.486z"></path> </g></svg>
            </div>
          </div>
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
