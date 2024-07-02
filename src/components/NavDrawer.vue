<script setup lang="ts">
import { useDrawerStore } from "~/stores/drawer";
const router = useRouter();
const drawerStore = useDrawerStore();
const scrollToId = <Function>inject("scrollToId");

const toggleIcon = () => {
  const icon = document.querySelector(".whatsappIcon");
  (icon as HTMLElement).style.display =
    (icon as HTMLElement).style.display === "none" ? "inline" : "none";
};

onMounted(() => {
  watchEffect(() => {
    if (drawerStore.showDrawer) {
      document.body.style.overflowY = "hidden";
      return;
    }
    document.body.style.overflowY = "auto";
  });
});

const navigationLinks = ref([
  {
    text: "Sobre a orion",
    target: "#sobre",
  },
  {
    text: "Porque nós",
    target: "#whyus",
  },
  {
    text: "Experiência",
    target: "#experience",
  },
  {
    text: "Personais",
    target: "#personals",
  }
]);
const scrollTo = <Function>inject("scrollToId");

const goTo = (target: string) => {
  if (target.startsWith("#")) {
    scrollTo(target);
  } else {
    window.location.href = target;
  }
};

function onNavbarClick(link: string) {
  if (link === "#features" || link === "#supported-systems") {
    router.push({ path: "/" }).then(() => goTo(link));
  } else {
    goTo(link);
  }
}

const handleClick = () => {
  drawerStore.showDrawer = false;
  toggleIcon();
};
</script>

<template>
  <div id="drawer" class="z-50 fixed" aria-modal="true" role="dialog">
    <transition name="fade">
      <div
        v-if="drawerStore.showDrawer"
        class="fixed inset-0 bg-gray-600/50 cursor-pointer"
        @click="handleClick()"
      />
    </transition>
    <transition name="slide-from-right">
      <div
        v-if="drawerStore.showDrawer"
        class="p-4 min-w-[15rem] fixed overflow-y-auto shadow-lg bg-orion-secondary-500 inset-y-0 right-0 left-4/4 flex flex-col justify-between"
      >
        <div class="flex justify-end">
          <button
            aria-controls="drawer"
            :aria-expanded="drawerStore.showDrawer"
            class="btn btn-square btn-ghost"
            aria-label="Toggle drawer"
            @click="drawerStore.showDrawer = !drawerStore.showDrawer"
          >
            <ci-close-big class="w-8 h-8 text-orion-primary-50" />
          </button>
        </div>
        <ul
          class="menu rounded-lg overflow-y-auto w-full flex flex-wrap content-end justify-evenly h-2/4"
        >
          <li
            v-for="link of navigationLinks"
            class="text-orion-headline-small text-orion-primary-50 font-semibold"
            :key="`drawer-${link.text}`"
            @click="onNavbarClick(link.target)"
          >
            <a class="flex justify-end" @click="goTo(link.target)">{{
              link.text
            }}</a>
          </li>
        </ul>
        <div>
          <button
            class="py-[0.88rem] px-4 border border-orion-secondary-50 hover:bg-orion-primary-500 hover:text-orion-secondary-50 hover:border-transparent font-medium text-orion-secondary-50 w-full transition duration-200"
            @click="scrollToId('#form')"
          >
            Logar
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>
