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

const cases = ref([
  {
    src: "/SuccesCases/woman1.png",
    title:
      "Como a parceria orion + Servicenow transformou a CEDAE em um case de sucesso!",
    showList: false,
    linkCase: "https://www2.extremedigital.com.br/caso-cedae/",
    list: [
      "Melhoria do atendimento ao cliente",
      "Otimização dos processos internos",
      "Redução de custos",
    ],
  },
  {
    src: "/SuccesCases/woman2.png",
    title:
      "Como a orion + ServiceNow desenvolveram, em menos de 60 dias, um atendimento virtual para o cidadão na pandemia",
    showList: false,
    linkCase: "https://www2.extremedigital.com.br/caso-dataprev/",
    list: [
      "Mais de 44 milhões de atendimentos",
      "Agilizou o atendimento ao cidadão",
      "Garantiu mais de 90% de retenção no bot",
    ],
  },
]);

function showListF(index) {
  cases.value[index].showList = !cases.value[index].showList;
}
</script>

<template>
  <div
    class="flex flex-col gap-16 items-center justify-center bg-sc py-24 px-6 lg:px-[4rem] xl:px-[8rem]"
  >
    <div class="hidden md:flex">
      <div v-for="(caseSucces, index) in cases" :key="index">
        <div
          class="flex flex-col p-4 hoverwrap max-w-[30.5rem]"
          @mouseenter="showListF(index)"
          @mouseleave="showListF(index)"
        >
          <img
            :src="caseSucces.src"
            alt=""
            class="grayscale-[50%] image-case transition-all duration-200"
          />
          <div class="flex flex-col flex-wrap justify-between bg-white p-8">
            <div
              style="transition: height 0.5s"
              :class="{
                'h-[10.5rem] mb-8': caseSucces.showList,
                'h-[5.5rem]': !caseSucces.showList,
              }"
            >
              <h2
                class="text-orion-title-lg text-orion-secondary-500 texto-caseSucces font-semibold mb-8"
              >
                {{ caseSucces.title }}
              </h2>
              <transition name="fade">
                <ul
                  class="flex flex-col gap-4"
                  v-show="caseSucces.showList == true"
                >
                  <li v-for="(item, index) in caseSucces.list" :key="index">
                    <div class="flex items-center">
                      <div class="w-1 h-1 mb-4 mr-2 bg-orion-primary-500"></div>
                      <p
                        class="text-orion-secondary-300 text-orion-title-sm font-semibold"
                      >
                        {{ item }}
                      </p>
                    </div>
                  </li>
                </ul>
              </transition>
            </div>
            <div>
              <a :href="caseSucces.linkCase" target="_blank">
                <button
                  class="py-[0.88rem] px-4 border border-orion-secondary-500 hover:bg-orion-primary-500 hover:text-orion-secondary-50 hover:border-transparent font-medium text-orion-secondary-500 transition duration-200 uppercase mt-[5.5rem]"
                >
                  Ver caso completo
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex">
      <Carousel
        :items-to-show="1"
        class="md:hidden flex"
        ref="carousel"
        v-model="currentSlide"
        snapAlign="start"
      >
        <Slide v-for="(caseSucces, index) in cases" :key="index">
          <div
            class="flex flex-col justify-between max-w-[30.5rem] min-h-[41.688rem] bg-white pb-4"
          >
            <img
              :src="caseSucces.src"
              alt=""
              class="image-case transition-all duration-200"
            />
            <div>
              <h2
                class="text-orion-title-md text-orion-primary-500 text-left font-semibold mx-4 my-4"
              >
                {{ caseSucces.title }}
              </h2>
            </div>

            <ul class="flex flex-col gap-4 mb-10 mx-4">
              <li v-for="(item, index) in caseSucces.list" :key="index">
                <div class="flex items-center">
                  <div
                    class="w-[0.4rem] h-[0.4rem] mr-2 bg-orion-primary-500"
                  ></div>
                  <p
                    class="text-orion-secondary-300 text-orion-title-sm font-semibold"
                  >
                    {{ item }}
                  </p>
                </div>
              </li>
            </ul>
            <a :href="caseSucces.linkCase" target="_blank">
              <button
                class="py-[0.88rem] px-4 border border-orion-secondary-500 hover:bg-orion-primary-500 hover:text-orion-secondary-50 hover:border-transparent font-medium text-orion-secondary-500 transition duration-200 uppercase text-[0.6875rem] mx-4"
              >
                Ver caso completo
              </button></a
            >
          </div>
        </Slide>
      </Carousel>
    </div>

    <div class="md:hidden flex gap-2 justify-center">
      <div
        v-for="i in cases.length"
        :key="i"
        class="w-[4.5rem] h-[0.25rem] transition-all duration-300"
        :class="
          currentSlide == i - 1 ? 'bg-orion-primary-500' : 'bg-orion-primary-100'
        "
      ></div>
    </div>

    <!-- <div
      class="flex flex-col gap-10 md:gap-0 md:flex-row items-center justify-between bg-orion-primary-500 w-full max-w-[61rem] p-8"
    >
      <h2
        class="text-orion-headline-sm lg:text-orion-headline-lg text-orion-neutrals-500 max-w-[33rem]"
      >
        Veja como a orion contribuiu com seus parceiros e alcançou grandes
        resultados
      </h2>
      <a href="">
        ><button
          class="py-[0.88rem] px-16 border border-orion-neutrals-500 hover:bg-orion-primary-900 hover:text-orion-secondary-50 hover:border-transparent font-medium text-orion-neutrals-500 transition duration-200 uppercase text-[0.6875rem] md:text-orion-title-md w-full md:w-auto"
        >
          Ver todos os casos
        </button>
      </a>
    </div> -->
  </div>
</template>

<style>
.hoverwrap:hover .image-case {
  filter: grayscale(0);
}
.hoverwrap:hover .texto-caseSucces {
  transition: all 200ms;
  color: #203aec;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.bg-sc {
  background-image: url("/src/assets/bgs/bgwe.png");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
