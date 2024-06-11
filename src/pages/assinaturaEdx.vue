<script setup>
import axios from "axios";
import { setLocale, object, string } from "yup";
import mailcheck from "mailcheck";
import debounce from "lodash/debounce.js";
import html2canvas from "html2canvas";

const imageSrc = ref("https://i.postimg.cc/3R5dBG7W/Design-sem-nome-3.png");

function uploadImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imageSrc.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

const errorMsg = ref(false);
const isOn = ref(false);

setLocale({
  mixed: {
    required: "Campo obrigatório",
  },
  string: {
    email: "Insira um email válido",
    min: "Insira um número de telefone com DDD",
    max: "Insira um número de telefone com menos de 14 digitos",
  },
});

let validationSchema = object({
  name: string().required(),
  email: string().required().email(),
  phone: string().required().min(10).max(14),
  secondName: string().required(),
  position: string().required(),
});

const { errors, handleSubmit, isSubmitting } = useForm({
  validationSchema,
});

const router = useRouter();

const { value: name } = useField("name");
const { value: email } = useField("email");
const { value: phone } = useField("phone");
const { value: secondName } = useField("secondName");
const { value: position } = useField("position");
const formatedPhone = ref("");

const maskedNumber = computed(() => {
  if (phone.value != null) {
    let number = phone.value.toString();
    if (number.length === 10) {
      formatedPhone.value = number.replace(/(\d{2})(\d{4})(\d{4})/, "$1 $2 $3");
    } else if (number.length === 11) {
      formatedPhone.value = number.replace(/(\d{2})(\d{5})(\d{4})/, "$1 $2 $3");
    } else if (number.length === 12) {
      formatedPhone.value = number.replace(
        /(\d{2})(\d{2})(\d{4})(\d{4})/,
        "+$1 $2 $3 $4"
      );
    } else if (number.length === 13) {
      formatedPhone.value = number.replace(
        /(\d{2})(\d{2})(\d{5})(\d{4})/,
        "+$1 $2 $3 $4"
      );
    } else {
      formatedPhone.value = number;
    }

    return formatedPhone.value;
  }
});

const marginControl = ref(true);
const showAlert = ref(false);
const failedToSubmit = ref(false);
const showErrorStyles = computed(() => failedToSubmit.value && showAlert.value);
const showSuccessStyles = computed(
  () => !failedToSubmit.value && showAlert.value
);
const mailSuggestion = ref(null);

const onSubmit = handleSubmit(async (values) => {
  marginControl.value = false;
  await nextTick();
  var link = document.createElement("link");
  link.href =
    "https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;600&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);
  let element = document.querySelector("#model1");
  html2canvas(element, {
    scale: 1,
    useCORS: true,
  }).then((canvas) => {
    let imgData = canvas.toDataURL();
    let link = document.createElement("a");
    link.href = imgData;
    link.download = "assinatura.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    marginControl.value = true;
  });
  const userInfos = {
    ...values,
    tipo: "Assinatura Default",
    formatedPhone: formatedPhone.value,
  };
  try {
    await axios.post(
      // "https://workflow.quoti.cloud/webhook/orion-signature",
      userInfos
    );
  } catch (error) {
    console.log(error.message);
  }
});
</script>

<template>
  <section class="bg-container py-16">
    <div
      class="mx-6 md:mx-0 md:py-0 h-full md:flex md:items-center md:justify-center xl:flex flex-col xl:items-center xl:justify-center"
    >
      <form
        v-show="!personalForm"
        class="bg-white rounded-lg px-4 py-8 md:px-8 shadow-xl"
        @submit.prevent="onSubmit"
      >
        <h3
          class="mb-2 font-semibold text-orion-label-lg md:text-orion-subtitle-md text-primary text-center"
        >
          Gerador de Assinaturas orion
        </h3>
        <h5 class="mb-4 text-orion-body-sm text-center">
          Gere agora sua assinatura personalizada <br />
        </h5>
        <div class="form-control w-full md:w-[400px] mb-2">
          <label class="label">
            <span class="label-text" :class="name ? 'text-primary' : ''"
              >Nome</span
            >
          </label>
          <input
            v-model.trim="name"
            @change="refreshRequests"
            type="text"
            placeholder="Digite aqui seu nome"
            class="input rounded-md placeholder:text-grey focus:outline-none focus:ring focus:ring-white"
            :class="name ? 'bg-white border-2 border-primary' : 'bg-[#EBECEE]'"
            id="form-name"
          />
          <span v-if="errors.name" class="text-orion-body-sm text-error ml-1">{{
            errors.name
          }}</span>
        </div>
        <div class="form-control w-full md:w-[400px] mb-2">
          <label class="label">
            <span class="label-text" :class="secondName ? 'text-primary' : ''"
              >Sobrenome</span
            >
          </label>
          <input
            v-model.trim="secondName"
            @change="refreshRequests"
            type="text"
            placeholder="Digite aqui seu sobrenome"
            class="input rounded-md placeholder:text-grey focus:outline-none focus:ring focus:ring-white"
            :class="
              secondName ? 'bg-white border-2 border-primary' : 'bg-[#EBECEE]'
            "
            id="form-secondName"
          />
          <span
            v-if="errors.secondName"
            class="text-orion-body-sm text-error ml-1"
            >{{ errors.secondName }}</span
          >
        </div>
        <div class="form-control w-full md:w-[400px] mb-2">
          <label class="label">
            <span class="label-text" :class="email ? 'text-primary' : ''"
              >Email</span
            >
          </label>
          <input
            v-model.trim="email"
            @change="refreshRequests"
            type="text"
            placeholder="Digite aqui seu email"
            class="input rounded-md placeholder:text-grey focus:outline-none focus:ring focus:ring-white"
            :class="email ? 'bg-white border-2 border-primary' : 'bg-[#EBECEE]'"
            id="form-email"
          />
          <span v-if="errors.email" class="text-orion-body-sm text-error ml-1">{{
            errors.email
          }}</span>
        </div>
        <div class="form-control w-full md:w-[400px] mb-2">
          <label class="label">
            <span class="label-text" :class="phone ? 'text-primary' : ''"
              >Telefone</span
            >
          </label>
          <input
            v-model.trim="phone"
            @change="refreshRequests"
            type="number"
            placeholder="Digite seu número (ex: 55112345678910)"
            class="input rounded-md placeholder:text-grey focus:outline-none focus:ring focus:ring-white"
            :class="phone ? 'bg-white border-2 border-primary' : 'bg-[#EBECEE]'"
            id="form-phone"
          />
          <span v-if="errors.phone" class="text-orion-body-sm text-error ml-1">{{
            errors.phone
          }}</span>
        </div>
        <div class="form-control w-full md:w-[400px] mb-2">
          <label class="label">
            <span class="label-text" :class="position ? 'text-primary' : ''"
              >Cargo</span
            >
          </label>
          <input
            v-model.trim="position"
            @change="refreshRequests"
            type="text"
            placeholder="Digite aqui seu cargo"
            class="input rounded-md placeholder:text-grey focus:outline-none focus:ring focus:ring-white"
            :class="
              position ? 'bg-white border-2 border-primary' : 'bg-[#EBECEE]'
            "
            id="form-position"
          />
          <span
            v-if="errors.position"
            class="text-orion-body-sm text-error ml-1"
            >{{ errors.position }}</span
          >
        </div>

        <div v-if="isOn">
          <label class="label">
            <span class="label-text" :class="position ? 'text-primary' : ''"
              >Foto</span
            >
          </label>
          <label for="file-input" class="sr-only">Choose file</label>
          <input
            type="file"
            name="file-input"
            id="file-input"
            @change="uploadImage"
            class="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-orion-primary-500 dark:border-gray-700 dark:text-white file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-3 file:px-4 dark:file:bg-[#EBECEE] dark:file:text-black"
          />
        </div>
        <div>
          <button
            id="sendButton"
            class="mt-4 py-2 btn-block border bg-transparent border-orion-secondary-500 hover:bg-orion-primary-500 hover:text-orion-secondary-50 hover:border-transparent font-medium text-orion-secondary-500 transition duration-200"
            :class="{
              loading: isSubmitting,
              'btn-error': showErrorStyles,
              'btn-success': showSuccessStyles,
            }"
          >
            <h2 class="normal-case text-orion-subtitle-sm">Baixar Assinatura</h2>
          </button>
        </div>
        <div
          v-if="showAlert"
          class="mt-4 rounded-none alert"
          :class="{
            'alert-error': showErrorStyles,
            'alert-success': showSuccessStyles,
          }"
        >
          <div class="flex-1">
            <label class="mx-3">{{
              failedToSubmit
                ? "Um erro ocorreu ao enviar o formulário :("
                : "Formulário enviado com sucesso!"
            }}</label>
          </div>
          <div class="flex-none">
            <button class="btn btn-sm btn-primary" @click="showAlert = false">
              Ok
            </button>
          </div>
        </div>
      </form>
      <h3
        class="mt-8 mb-2 font-semibold text-orion-label-lg md:text-orion-subtitle-md text-orion-primary-50 text-center"
      >
        Veja como será o resultado final da sua assinatura:
      </h3>
      <div id="model1" class="flex w-[38.125rem] h-[13.125rem]">
        <div class="bg-orion-primary-500 h-full w-[1.875rem]"></div>
        <div class="w-full h-full">
          <div class="py-5 pr-4 h-[85%] bg-white flex justify-between">
            <div class="flex flex-col justify-between">
              <div class="ml-6 mb-10">
                <h2
                  class="text-orion-primary-500 font-semibold text-orion-headline-lg leading-[0rem]"
                  :class="marginControl ? 'mt-4' : 'mt-0'"
                >
                  {{ name }}
                </h2>
                <h2
                  class="text-orion-primary-500 font-semibold text-orion-headline-lg leading-[0rem] mt-9"
                >
                  {{ secondName }}
                </h2>
                <h3 class="mt-8 text-orion-title-md">{{ position }}</h3>
              </div>
            </div>
            <div class="flex flex-col justify-between items-end">
              <img
                src="https://i.postimg.cc/zXBzMY4W/orion-03-2x.png"
                alt=""
                class="w-[121.65px] h-[40px]"
              />
              <img
                src="https://i.postimg.cc/Kcdb93rX/dsadsa.jpg"
                alt=""
                class="w-[121.65px] h-[53.11px]"
              />
            </div>
          </div>
          <div class="flex items-center h-[15%]">
            <div class="flex bg-orion-secondary-500 w-full h-full px-5 gap-12">
              <p
                class="text-orion-neutrals-500 text-orion-title-esm"
                :class="marginControl ? 'mt-[0.6rem]' : 'mt-[0.15rem]'"
              >
                {{ maskedNumber }}
              </p>
              <p
                class="text-orion-neutrals-500 text-orion-title-esm"
                :class="marginControl ? 'mt-[0.6rem]' : 'mt-[0.15rem]'"
              >
                {{ email }}
              </p>
            </div>
            <div
              class="flex justify-end bg-orion-secondary-100 h-full w-[171px] px-4"
            >
              <p
                class="text-orion-secondary-500 text-orion-title-esm"
                :class="marginControl ? 'mt-[0.6rem]' : 'mt-[0.15rem]'"
              >
                goorion.com.br
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.bg-container {
  background-image: url("/src/assets/bgs/bghero.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  min-height: 100vh;
}
</style>
