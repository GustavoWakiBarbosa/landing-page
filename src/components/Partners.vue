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

const isMobile = ref(false);

const carousel = ref(null);

const props = defineProps({
  typeCarousel: String,
});

const logos = ref([]);

const itemsToShow = ref(6);

onMounted(() => {
  const updateItemsToShow = () => {
    logos.value = props.typeCarousel === "Gray" ? logosGray : logosColored;
    if (window.innerWidth > 768 && props.typeCarousel === "Colored") {
      itemsToShow.value = 3;
    } else if (window.innerWidth < 768 && props.typeCarousel === "Gray") {
      itemsToShow.value = 2;
    } else if (window.innerWidth < 1536 && props.typeCarousel === "Gray") {
      itemsToShow.value = 4;
    } else if (window.innerWidth > 1536 && props.typeCarousel === "Gray") {
      itemsToShow.value = 6;
    }
    if (window.innerWidth < 1024 && props.typeCarousel === "Colored") {
      itemsToShow.value = 2;
    }
  };

  updateItemsToShow();
  window.addEventListener("resize", updateItemsToShow);
});

const logosGray = [
  {
    src: "/logosGray/renner.svg",
  },
  {
    src: "/logosGray/yara.svg",
  },
  {
    src: "/logosGray/raia.svg",
  },
  {
    src: "/logosGray/fast.svg",
  },
  {
    src: "/logosGray/itaipu.svg",
  },
  {
    src: "/logosGray/YDUQS.svg",
  },
  {
    src: "/logosGray/santander.svg",
  },
  {
    src: "/logosGray/dpsp.svg",
  },
  {
    src: "/logosGray/cedae.svg",
  },
  {
    src: "/logosGray/data_prev.svg",
  },
  {
    src: "/logosGray/TBG.svg",
  },
  {
    src: "/logosGray/anima.svg",
  },
  {
    src: "/logosGray/namu.svg",
  },
  {
    src: "/logosGray/camara.svg",
  },
];

const logosColored = [
  {
    src: "/logosColored/servicenow.svg",
  },
  {
    src: "/logosColored/rocketchat.svg",
  },
  {
    src: "/logosColored/five9.svg",
  },
  {
    src: "/logosColored/nuveto.svg",
  },
  {
    src: "/logosColored/rdstation.svg",
  },
  {
    src: "/logosColored/zenvia.svg",
  },
];
</script>

<template>
  <div class="bg-orion-secondary-white py-10">
    <h2
      class="text-orion-label-sm font-semibold text-orion-secondary-100 mb-6 text-center"
    >
      {{
        typeCarousel === "Gray"
          ? "Alguns dos parceiros que confiam nas nossas soluções"
          : "NOSSOS PARCEIROS ESTRATÉGICOS"
      }}
    </h2>
    <Carousel
      :items-to-show="itemsToShow"
      class="flex justify-center gap-20 px-10 lg:px-[4rem]"
      :class="
        typeCarousel === 'Gray' ? 'px-12 xl:px-[12rem]' : 'px-12 xl:px-[12rem]'
      "
      ref="carousel"
      v-model="currentSlide"
      snapAlign="center"
      :wrap-around="false"
    >
      <Slide v-for="(logo, index) in logos" :key="index" class="">
        <div class="carousel__item items-center">
          <img :src="logo.src" />
        </div>
      </Slide>
      <template #addons>
        <Navigation class="2xl:mx-32" />
      </template>
    </Carousel>
  </div>
</template>
