<script setup>
import { defineComponent } from "vue";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { watch } from "vue";

const components = {
  Carousel,
  Slide,
  Pagination,
  Navigation,
};

const carousel = ref(null);

const next = () => {
  carousel.value.next();
};

const prev = () => {
  carousel.value.prev();
};

const services = [
  {
    title: "Assessment",
    src: "/servicesImages/1.png",
    description:
      "Obter uma compreensão abrangente da sua situação atual, identificando áreas de oportunidade e detectando problemas ou ineficiências para fornecer recomendações de melhorias.",
    features: [
      {
        title: "Análise da Implementação Atual",
        description:
          "Analisamos detalhadamente a configuração e integração da plataforma, aderência a padrões de governança, segurança e melhores práticas, identificando pontos e áreas de possível aprimoramento.",
        isOpen: false,
      },
      {
        title: "Eficiência no Uso da Plataforma",
        description:
          "Avaliamos como a plataforma está sendo usada, quais módulos e plugins estão em uso, customizações e comparamos com o licenciamento contratado, identificando oportunidades redução de custos, aumento da eficiência e novas funcionalidades.",
        isOpen: false,
      },
      {
        title: "Uso Inteligente do Licenciamento",
        description:
          "Verificamos se a organização está utilizando as licenças de maneira eficiente, alinhada às suas necessidades e de acordo com tipo de licenciamento contratado, apontando processos de governança de licenças e otimizações possíveis.",
        isOpen: false,
      },
    ],
  },
  {
    title: "Customer Experience",
    src: "/servicesImages/2.png",
    description:
      "Atuamos no mapeamento das principais dores e gargalos das suas operações criando soluções personalizadas que agreguem valor à sua organização e aos clientes.",
    features: [
      {
        title: "Levantamento de dores e objetivos",
        description:
          "Através de uma consultoria especializada, identificamos seus objetivos de negócios e criamos soluções personalizadas que abordam diretamente essas necessidades.",
        isOpen: false,
      },
      {
        title: "Provas de valor",
        description:
          "Com provas práticas e mensuráveis, demonstramos a aderência da plataforma e seus aceleradores para determinados cenários de negócio para subsidiar o business case e a tomada de decisão.",
        isOpen: false,
      },
      {
        title: "Apoio comercial com a ServiceNow",
        description:
          "Colaboramos estrategicamente com a ServiceNow identificar o melhor cenário de adoção da plataforma e otimizar seu investimento em subscrições.",
        isOpen: false,
      },
    ],
  },
  {
    title: "Projetos",
    src: "/servicesImages/3.png",
    description:
      "Planejar e implementar projetos com a utilização de uma abordagem estruturada e metodologias testadas para garantir uma entrega bem-sucedida em tempo, eficiente em recursos e transparente.",
    features: [
      {
        title: "Entendimento completo do ambiente tecnológico",
        description:
          "Possuímos vasta experiência em uma variedade de soluções, com a visão clara de todo seu ambiente tecnológico, conseguimos propor, coordenar times e executar o projeto de forma mais eficiente.",
        isOpen: false,
      },
      {
        title: "Metodologia Testada e Comprovada",
        description:
          "Nossa entrega segue uma metodologia rigorosa, provada no campo, para garantir a qualidade e a consistência dos resultados.",
        isOpen: false,
      },
      {
        title: "Acompanhamento transparente",
        description:
          "Utilizamos a plataforma para condução dos projetos, facilitando a comunicação, o acompanhamento e a transparência ao longo de todas as fases do projeto.",
        isOpen: false,
      },
      {
        title: "Integração e automação",
        description:
          "Nossos especialistas possuem grande experiencia em integrações e automação da plataforma com diversos sistemas e protocolos. Colaboramos com equipes e fornecedores para promover a integração completa.",
        isOpen: false,
      },
    ],
  },
  {
    title: "Processos",
    src: "/servicesImages/7.png",
    description:
      "Analisar, otimizar e reestruturar as atividades essenciais da sua organização para sugerir e implementar melhorias que impulsionem a eficiência e a produtividade.",
    features: [
      {
        title: "As Is and To Be",
        description:
          "Realizamos análises detalhadas dos processos atuais (As Is) e desenhamos os processos futuros (To Be) para identificar e propor melhorias.",
        isOpen: false,
      },
      {
        title: "Processos aderentes a plataforma",
        description:
          "Desenvolvemos processos que se integram perfeitamente à plataforma utilizada, garantindo eficiência e otimização.",
        isOpen: false,
      },
      {
        title: "Adoção dos principais frameworks do mercado",
        description:
          "Nossos especialistas possuem certificações reconhecidas e qualificações em metodologias, padrões ou estruturas amplamente adotadas no mercado.",
        isOpen: false,
      },
      {
        title: "Experiencia em diversos projetos ",
        description:
          "Trazemos a experiencia em dezenas de projetos para acelerar a otimização de processos com casos de aplicação prática e comprovada.",
        isOpen: false,
      },
    ],
  },
  {
    title: "Customer experience",
    src: "/servicesImages/5.png",
    description:
      "Aprimorar a jornada do cliente, desde o primeiro contato até a conclusão, visando oferecer uma experiência eficiente, intuitiva e fluida.",
    features: [
      {
        title: "Entrevistas",
        description:
          "Realizamos entrevistas para compreender as necessidades e feedbacks dos usuários, direcionando o projeto através de uma abordagem estruturada.",
        isOpen: false,
      },
      {
        title: "Prototipação",
        description:
          "Materializamos ideias por meio de protótipos interativos, permitindo testes e refinamentos.",
        isOpen: false,
      },
      {
        title: "UX Design  ",
        description:
          "Criamos experiências centradas no usuário, garantindo interações intuitivas e funcionais.",
        isOpen: false,
      },
      {
        title: "User Interface",
        description:
          "Desenvolvemos interfaces atraentes e coesas para uma experiência visualmente intuitiva e fluida.",
        isOpen: false,
      },
      {
        title: "UX Writing",
        description:
          "Utilizamos a palavra certa para orientar os usuários de maneira clara e simplificada.",
        isOpen: false,
      },
    ],
  },
  {
    title: "Sustentação",
    src: "/servicesImages/4.png",
    description:
      "Garantir a constante evolução do ambiente, oferecendo suporte após o projeto e planejando cuidadosamente as atualizações para manter sua operação otimizada.",
    features: [
      {
        title: "Evolução contínua",
        description:
          "Garantimos o aprimoramento constante do seu ambiente, mantendo-o atualizado com as melhores práticas e inovações.",
        isOpen: false,
      },
      {
        title: "Suporte pós-projeto",
        description:
          "Após a conclusão do projeto, fornecemos suporte contínuo para manter o ambiente funcionando de maneira eficiente.",
        isOpen: false,
      },
      {
        title: "Roadmap e upgrades",
        description:
          "Desenvolvemos um plano estratégico para upgrades de versão, assegurando que você esteja sempre alinhado com as últimas funcionalidades e segurança da plataforma.",
        isOpen: false,
      },
    ],
  },
  {
    title: "Academia ServiceNow",
    src: "/servicesImages/6.png",
    description:
      "Treinamento e capacitação para estudantes do ensino técnico e superior na área de tecnologia da informação em Tecnologias ServiceNow, aproximando-os do mercado de trabalho. Isso é alcançado por meio de aulas ministradas por Especialistas em ServiceNow, que podem compartilhar sua experiência e insights com os estudantes.",
    features: [
      {
        title: "Treinamento focado na profissionalização",
        description:
          "A Academia ServiceNow oferece aos a oportunidade de aprender os conceitos e tecnologias ServiceNow em um ambiente que simula o mundo real, desenvolvendo soluções para problemas reais. O treinamento é composto por aulas teóricas e práticas, exercícios e projetos.",
        isOpen: false,
      },
      {
        title: "Teoria + Hands-on",
        description:
          "Essa metodologia é essencial para o aprendizado profissionalizante fornecendo aos estudantes uma base sólida de conhecimento, através da teoria, e permitindo que eles apliquem os conhecimentos adquiridos e desenvolvam habilidades práticas com a mão na massa.",
        isOpen: false,
      },
      {
        title: "Bootcamps",
        description:
          "Os bootcamps da Academia ServiceNow são cursos intensivos e cobrem uma ampla gama de tópicos, incluindo teoria, hands-on e certificação. Acelerando os estudantes a adquirirem as habilidades necessárias para atuar como profissionais ServiceNow.",
        isOpen: false,
      },
    ],
  },
];

const chosenService = ref(services[0]);
const arrayFeaturesOpen = ref([]);
const isMobile = ref(false);

function captureService(index) {
  chosenService.value = services[index];
}

function changeFeatureOpen(index) {
  chosenService.value.features[index].isOpen =
    !chosenService.value.features[index].isOpen;
}

const showImageService = ref(true);

onMounted(() => {
  const updateItemsToShow = () => {
    if (window.innerWidth < 768) {
      itemsToShow.value = 2;
    } else if (window.innerWidth < 1024) {
      itemsToShow.value = 4;
    } else {
      itemsToShow.value = 6;
    }

    if (window.innerWidth < 1280) {
      showImageService.value = false;
    } else {
      showImageService.value = true;
    }
  };

  updateItemsToShow();
  window.addEventListener("resize", updateItemsToShow);
});

function featureControl(index) {
  if (isMobile.value == false) {
    if (chosenService.value.features[index].isOpen == false) {
      arrayFeaturesOpen.value.push(index);
      if (arrayFeaturesOpen.value.length > 2) {
        chosenService.value.features[arrayFeaturesOpen.value[0]].isOpen = false;
        arrayFeaturesOpen.value.shift();
        changeFeatureOpen(index);
      } else {
        changeFeatureOpen(index);
      }
    } else {
      changeFeatureOpen(index);
      arrayFeaturesOpen.value.splice(index);
    }
  } else {
    changeFeatureOpen(index);
  }
}

const itemsToShow = ref(6);
</script>

<template>
  <div
    class="py-16 md:py-24 px-6 lg:px-[4rem] xl:px-[4rem] 2xl:px-[15rem] bg-services"
  >
    <div class="max-w-[58rem] lg:ml-20 mb-14">
      <h3
        class="mb-4 text-orion-neutrals-500 orion-title-md md:text-orion-title-lg font-normal uppercase"
      >
        Serviços
      </h3>
      <h2
        class="text-orion-primary-500 text-orion-display-sm md:text-orion-display-lg font-semibold"
      >
        Atuação integrada de ponta a ponta
      </h2>
      <p
        class="mt-10 text-orion-neutrals-500 orion-title-md md:text-orion-headline-sm"
      >
        Nossos serviços têm como foco a consultoria especializada,
        desenvolvimento e implementação das soluções para os desafios de negócio
        dos nossos clientes.
      </p>
    </div>

    <div class="flex md:gap-8 justify-between mt-8 lg:px-[3rem] 2xl:px-[3rem]">
      <img
        @click="prev"
        src="/src/assets/Chevron.svg"
        class="transition-all duration-300 cursor-pointer"
        :class="{ 'opacity-0': adjustedSlide == 1 }"
      />
      <Carousel
        :items-to-show="itemsToShow"
        class="flex justify-center"
        ref="carousel"
        v-model="currentSlide"
        snapAlign="start"
      >
        <Slide v-for="(service, index) in services" :key="index">
          <div
            class="flex items-center justify-center carousel__item py-2 px-6 w-full h-[4.25rem] md:h-[5.5rem] border-b-4 hover:border-orion-primary-500"
            @click="captureService(index)"
            :class="
              chosenService.title == service.title
                ? 'bg-carousel border-orion-primary-500'
                : 'border-transparent'
            "
          >
            <p
              class="text-orion-neutrals-500 orion-title-md md:text-orion-title-lg font-semibold"
            >
              {{ service.title }}
            </p>
          </div>
        </Slide>
      </Carousel>
      <img
        @click="next"
        src="/src/assets/Chevron.svg"
        class="scale-x-[-1] transition-all duration-300 cursor-pointer"
      />
    </div>

    <div
      class="bg-carousel flex flex-col xl:flex-row gap-8 items-center justify-between p-4 md:p-10 lg:px-8 lg:py-4 lg:min-h-[29.175rem]"
    >
      <div v-if="showImageService" class="flex-shrink-0">
        <img :src="chosenService.src" alt="" class="object-contain" />
      </div>
      <div class="max-w-[34.5rem]">
        <h2
          class="text-orion-title-lg md:text-orion-display-sm text-white font-semibold mb-8 md:mb-20"
        >
          {{ chosenService.title }}
        </h2>
        <p class="text-orion-title-md md:text-orion-headline-sm text-white mb-10">
          {{ chosenService.description }}
        </p>
      </div>
      <div class="flex flex-col md:px-4">
        <div
          v-for="(feature, index) in chosenService.features"
          @click="featureControl(index)"
          :key="index"
          class="flex flex-col gap-4 p-4 border-b-2 border-orion-neutrals-500 w-[19.375rem] md:w-[20.5rem]"
        >
          <div class="flex justify-between">
            <p
              class="text-orion-title-sm md:text-orion-title-md text-orion-neutrals-500 font-medium"
              :class="{
                'text-orion-primary-500': feature.isOpen == true,
              }"
            >
              {{ feature.title }}
            </p>
            <img
              v-if="feature.isOpen == false"
              src="/src/assets/open.svg"
              alt=""
            />
            <img v-else src="/src/assets/close.svg" alt="" />
          </div>

          <p
            v-if="feature.isOpen == true"
            class="text-orion-title-sm text-orion-neutrals-500 font-medium"
          >
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.bg-services {
  background-image: url("/src/assets/bgs/bgservice.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}

.bg-carousel {
  background: rgba(241, 241, 242, 0.05);
}
</style>
