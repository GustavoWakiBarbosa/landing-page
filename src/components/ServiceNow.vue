<script setup>
const chosenControl = ref("Technology Workflow");

const chosenService = computed(() => {
  return services.find((service) => service.title == chosenControl.value);
});

function setService(title) {
  chosenControl.value = title;
}

const services = [
  {
    src: "/Services/TECHNOLOGYWORKFLOW.svg",
    title: "Technology Workflow",
    specificServices: ["ITSM", "ITOM | AIOps", "ITAM", "SPM", "SECOPS", "GRC"],
  },
  {
    src: "/Services/EMPLOYEEWORKFLOW.svg",
    title: "Employee Experience",
    specificServices: ["HR", "Legal", "Workplace"],
  },
  {
    src: "/Services/CUSTOMERWORKFLOW.svg",
    title: "Customer Experience",
    specificServices: [
      "CSM",
      "Field Service",
      "Financial Ops",
      "Public Sector",
    ],
  },
  {
    src: "/Services/CREATORWORKFLOW.svg",
    title: "Creator Workflow",
    specificServices: ["Automation Engine", "App Engine", "Procurement"],
  },
];
</script>

<template>
  <div
    class="flex flex-col items-center justify-center flex-wrap bg-sn py-16 md:py-[4.31rem] px-6 md:px-[3.75rem] 2xl:px-[11rem].bg-sc"
  >
    <div class="flex flex-col items-center justify-center">
      <div
        class="flex flex-col md:flex-row gap-8 justify-between w-full mb-10 md:mb-0"
      >
        <div class="flex flex-col gap-8 max-w-[47.125rem] md:mb-8">
          <h2
            class="text-orion-secondary-500 text-orion-display-sm md:text-orion-display-md font-semibold"
          >
            Aceleradores ServiceNow
          </h2>
          <h3
            class="text-orion-title-md md:text-orion-headline-sm text-orion-secondary-300"
          >
            A plataforma ServiceNow oferece soluções para todas as áreas de sua
            organização, permitindo entregar experiências excelentes e melhorar
            a produtividade com fluxos de trabalho digitais avançados.
          </h3>
        </div>
        <img
          src="/Partner.png"
          alt=""
          class="hidden md:block w-[7.25rem] h-[7.25rem] md:w-[11.25rem] md:h-[11.25rem]"
        />
      </div>

      <div class="w-full grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12">
        <div
          class="col-span-full gap-4 md:gap-8 grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12"
        >
          <div
            v-for="(service, index) in services"
            :key="index"
            class="col-span-2 md:col-span-4 xl:col-span-3 border-b-4 hover:border-[#62D84E]"
            :class="
              chosenControl == service.title
                ? 'bg-hover border-[#62D84E]'
                : 'border-transparent'
            "
          >
            <div
              class="flex flex-col items-center justify-center md:hover:bg-hover pb-4 md:p-8 h-full"
              :class="chosenControl == service.title ? 'md:bg-hover' : ''"
              @click="setService(service.title)"
            >
              <img
                :src="service.src"
                alt=""
                class="object-none w-[100px]"
                :class="chosenControl != service.title ? 'opacity-50' : ''"
              />
              <h3
                class="text-orion-secondary-500 text-orion-title-md md:text-orion-title-lg font-semibold uppercase text-center px-4"
              >
                {{ service.title }}
              </h3>
            </div>
          </div>
        </div>
        <h2
          class="xl:hidden text-orion-title-lg font-semibold text-orion-secondary-500 col-span-full text-center mt-10 mb-8 uppercase"
        >
          {{ chosenControl }}
        </h2>
        <div
          class="md:bg-[#f1f1f2] grid grid-cols-4 xl:grid-cols-12 gap-4 md:gap-x-12 gap-y-4 md:px-6 md:py-8"
          style="transition: height 0.5s"
          :class="{
            'col-span-full': chosenControl === 'Technology Workflow',
            'col-span-full xl:col-start-4 xl:col-end-10 xl:ml-[8px]':
              chosenControl === 'Employee Experience',
            'col-span-full xl:col-start-7 xl:col-end-13 xl:ml-[16px]':
              chosenControl === 'Customer Experience' ||
              chosenControl === 'Creator Workflow',
          }"
        >
          <div
            v-for="(specificService, index) in chosenService.specificServices"
            :key="index"
            class="flex flex-col border border-orion-secondary-300 bg-white py-4 px-[0.62rem] xl:max-w-none hover:bg-orion-primary-500 hover:border-primary hoverwrap transition: all 200ms"
            :class="
              chosenControl === 'Technology Workflow'
                ? 'col-span-2 xl:col-span-3'
                : 'col-span-2 xl:col-span-6 '
            "
          >
            <p
              class="text-orion-title-md text-orion-secondary-300 font-semibold text-center textWhite my-auto"
            >
              {{ specificService }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.bg-sc {
  background-image: url("/src/assets/bgs/bgwe.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.bg-hover {
  background-color: #f1f1f2;
}

.hoverwrap:hover .textWhite {
  color: white;
  transition: all 200ms;
}
</style>
