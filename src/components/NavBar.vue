<script setup>
import { useDrawerStore } from "~/stores/drawer";
import { onMounted, onUnmounted, ref } from "vue";
const scrollToId = inject("scrollToId");
const router = useRouter();
const grid = useGrid("tailwind");
const drawerStore = useDrawerStore();
const scrollY = ref(0);
const showNav = ref(true);
let prevScrollPos = window.scrollY;

const navBarControl = ref(false);

const handleScroll = () => {
  scrollY.value = window.scrollY;
  const currentScrollPos = window.scrollY;
  showNav.value =
    prevScrollPos <= 0 ||
    prevScrollPos <= 150 ||
    prevScrollPos >= currentScrollPos;
  prevScrollPos = currentScrollPos;
  if (scrollY.value > 850) {
    navBarControl.value = true;
  } else {
    navBarControl.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const navigationLinks = ref([
  {
    text: "Sobre a orion",
    target: "#sobre",
  },
  {
    text: "Serviços",
    target: "#servicos",
  },
  {
    text: "Personais",
    target: "#personais",
  },
  {
    text: "Feedbacks",
    target: "#carreiras",
  },
  {
    text: "Fale conosco",
    target: "#faleconosco",
  },
]);

function onNavbarClick(link) {
  if (link === "#features" || link === "#supported-systems") {
    router.push({ path: "/" }).then(() => goTo(link));
  } else {
    goTo(link);
  }
}

const scrollTo = inject("scrollToId");

const goTo = (target) => {
  if (target.startsWith("#")) {
    scrollTo(target);
  } else {
    window.location.href = target;
  }
};

const isMobile = ref(false);
onMounted(() => {
  if (window.innerWidth < 768) {
    isMobile.value = true;
  }
});
</script>

<!-- :class="{ 'top-0': showNav, '-top-24': !showNav }" -->

<template>
  <transition name="fade">
    <nav
      class="navbar md:min-h-[6rem] md:pt-12 pt-6 pb-6 fixed w-full top-0 inset-x-0 bg-transparent z-40 transition-all duration-500 ease-in-out md:px-[2rem] lg:px-[4rem] xl:px-[8rem]"
      :class="{
        'backdrop-blur-lg': scrollY > 100,
        'backdrop-blur-none': scrollY < 100,
        'bg-orion-neutrals-50 backdrop-blur-none': navBarControl == true,
      }"
    >
      <div class="w-full flex justify-between xl:container">
        <div class="px-2 mx-2 clickable" @click="router.push({ path: '/' })">
          <h2 class="text-orion-secondary-50 text-orion-display-md" :class="navBarControl == true ? 'text-orion-primary-500' : ''">
            Orion <span class="text-orion-primary-500">Fitness</span>
          </h2>
        </div>
        <div v-if="grid.xl" class="flex gap-12">
          <div
            v-for="link of navigationLinks"
            @click="onNavbarClick(link.target)"
            :key="link.text"
            :id="link.id"
            class="cursor-pointer"
          >
            <p
              class="normal-case text-bg-orion-secondary-500 font-medium p-[0.62rem] h-auto inline-block border-b-4 border-transparent relative"
              :class="
                navBarControl == false
                  ? 'text-orion-neutrals-500'
                  : 'text-orion-secondary-500-500'
              "
            >
              {{ link.text }}
            </p>
          </div>
        </div>
        <button
          v-if="grid.xl"
          class="text-orion-label-sm font-medium px-4 py-[0.88rem] transition duration-200"
          :class="
            navBarControl == false
              ? 'bg-orion-primary-500 text-orion-secondary-50 hover:bg-orion-primary-700 hover:text-white hover:border-primary'
              : 'bg-transparent border-2 border-orion-secondary-500 text-orion-secondary-500 hover:bg-orion-primary-500 hover:text-white hover:border-primary'
          "
          @click="scrollTo('#form')"
        >
          Fale conosco
        </button>
        <div v-if="!grid.xl" class="flex-none">
          <button
            aria-controls="drawer"
            :aria-expanded="drawerStore.showDrawer"
            class="btn btn-square btn-ghost"
            aria-label="Toggle drawer"
            @click="drawerStore.showDrawer = !drawerStore.showDrawer"
          >
            <ci-menu-alt-02 class="w-8 h-8 text-primary" />
          </button>
        </div>
      </div>
    </nav>
  </transition>
</template>

<style scoped>
::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 4px;
  background-color: #ff0000;
  transition: width 0.3s ease-in-out;
}

p:hover::before {
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
