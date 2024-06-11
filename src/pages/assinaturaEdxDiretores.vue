<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { setLocale, object, string } from "yup";
import mailcheck from "mailcheck";
import debounce from "lodash/debounce.js";
// import html2canvas from "html2canvas";
import Cropper from "cropperjs";
import domtoimage from "dom-to-image";
import pkg from "file-saver";
const { saveAs } = pkg;

const marginControl = ref(true);
const image = ref("https://i.postimg.cc/3R5dBG7W/Design-sem-nome-3.png");
const cropper = ref(null);
const destination = ref("https://i.postimg.cc/3R5dBG7W/Design-sem-nome-3.png");
const src = ref("https://i.postimg.cc/3R5dBG7W/Design-sem-nome-3.png");

onMounted(() => {
  if (image.value) {
    cropper.value = new Cropper(image.value, {
      zoomable: false,
      scalable: false,
      aspectRatio: 1,
      crop: () => {
        const canvas = cropper.value.getCroppedCanvas();
        destination.value = canvas.toDataURL("image/png");
      },
    });
  }
});

function uploadImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      src.value = e.target.result;
      image.value = new Image();
      image.value.src = e.target.result;
      image.value.onload = () => {
        if (cropper.value) {
          cropper.value.destroy();
        }
        cropper.value = new Cropper(image.value, {
          zoomable: false,
          scalable: false,
          aspectRatio: 1,
          crop: () => {
            const canvas = cropper.value.getCroppedCanvas();
            destination.value = canvas.toDataURL("image/png");
          },
        });
      };
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

const showAlert = ref(false);
const failedToSubmit = ref(false);
const showErrorStyles = computed(() => failedToSubmit.value && showAlert.value);
const showSuccessStyles = computed(
  () => !failedToSubmit.value && showAlert.value
);
const mailSuggestion = ref(null);
const onSubmit = handleSubmit(async (values) => {
  let node = document.getElementById("model2");

  domtoimage
    .toBlob(node, {
      height: node.offsetHeight * 2,
      width: node.offsetWidth * 2,
      style: {
        transform: "scale(2)",
        transformOrigin: "top left",
        width: node.offsetWidth + "px",
        height: node.offsetHeight + "px",
      },
    })
    .then(function (blob) {
      saveAs(blob, "model2.png");
    });

  const userInfos = {
    ...values,
    tipo: "Assinatura Diretores",
    formatedPhone: formatedPhone.value,
  };
  try {
    await axios.post(
      "https://workflow.quoti.cloud/webhook/orion-signature",
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
          <span
            v-if="errors.email"
            class="text-orion-body-sm text-error ml-1"
            >{{ errors.email }}</span
          >
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
          <span
            v-if="errors.phone"
            class="text-orion-body-sm text-error ml-1"
            >{{ errors.phone }}</span
          >
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

        <div>
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
            <h2 class="normal-case text-orion-subtitle-sm">
              Baixar Assinatura
            </h2>
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

      <div class="flex gap-4">
        <div class="img-container">
          <img ref="image" :src="src" crossorigin class="w-[340px] h-[180px]" />
        </div>
        <div id="model2" class="w-[38.125rem] h-[13.125rem]">
          <div class="flex w-full h-[85%] relative">
            <div class="bg-orion-primary-500 h-full w-[5rem]"></div>
            <div class="py-5 pr-4 w-full bg-white flex justify-end">
              <div class="flex absolute left-[1.5rem]">
                <img
                  :src="destination"
                  class="w-[7.5rem] h-[8.75rem] object-cover"
                />

                <div class="flex flex-col justify-between">
                  <div class="ml-6 flex flex-col justify-between h-full">
                    <div>
                      <h2
                        class="text-orion-primary-500 font-semibold text-orion-headline-lg leading-[0rem]"
                        :class="marginControl ? 'mt-4' : 'mt-0'"
                      >
                        {{ name }}
                      </h2>
                      <h2
                        class="text-orion-primary-500 font-semibold text-orion-headline-lg leading-[0rem] mt-8"
                      >
                        {{ secondName }}
                      </h2>
                      <h3 class="mt-8 text-orion-title-sm leading-5">
                        {{ position }}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="justify-self-end flex flex-col justify-between items-end"
              >
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
          </div>
          <div class="flex items-center h-[15%]">
            <div
              class="flex items-center bg-orion-secondary-500 w-full h-full px-5 gap-20"
            >
              <p
                class="text-orion-neutrals-500 text-orion-title-esm"
                style="white-space: nowrap"
              >
                {{ maskedNumber }}
              </p>
              <p class="text-orion-neutrals-500 text-orion-title-esm">
                {{ email }}
              </p>
            </div>
            <div
              class="flex items-center justify-end bg-orion-secondary-100 h-full w-[171px] px-4"
            >
              <p class="text-orion-secondary-500 text-orion-title-esm">
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

.cropper {
  width: 120px;
  height: 140px;
  background: #ddd;
}

/* cyrillic-ext */
@font-face {
  font-family: "Fira Sans";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/firasans/v17/va9E4kDNxMZdWfMOD5VvmojLeTY.woff2)
    format("woff2");
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
    U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: "Fira Sans";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/firasans/v17/va9E4kDNxMZdWfMOD5Vvk4jLeTY.woff2)
    format("woff2");
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: "Fira Sans";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/firasans/v17/va9E4kDNxMZdWfMOD5Vvm4jLeTY.woff2)
    format("woff2");
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: "Fira Sans";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/firasans/v17/va9E4kDNxMZdWfMOD5VvlIjLeTY.woff2)
    format("woff2");
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: "Fira Sans";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/firasans/v17/va9E4kDNxMZdWfMOD5VvmIjLeTY.woff2)
    format("woff2");
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1,
    U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329,
    U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: "Fira Sans";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/firasans/v17/va9E4kDNxMZdWfMOD5VvmYjLeTY.woff2)
    format("woff2");
  unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
    U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: "Fira Sans";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/firasans/v17/va9E4kDNxMZdWfMOD5Vvl4jL.woff2)
    format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191,
    U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: "Fira Sans";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnZKveSxf6TF0.woff2)
    format("woff2");
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
    U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: "Fira Sans";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnZKveQhf6TF0.woff2)
    format("woff2");
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: "Fira Sans";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnZKveShf6TF0.woff2)
    format("woff2");
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: "Fira Sans";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnZKveRRf6TF0.woff2)
    format("woff2");
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: "Fira Sans";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnZKveSRf6TF0.woff2)
    format("woff2");
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1,
    U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329,
    U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: "Fira Sans";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnZKveSBf6TF0.woff2)
    format("woff2");
  unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
    U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: "Fira Sans";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnZKveRhf6.woff2)
    format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191,
    U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: "Fira Sans";
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnSKzeSxf6TF0.woff2)
    format("woff2");
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
    U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: "Fira Sans";
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnSKzeQhf6TF0.woff2)
    format("woff2");
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: "Fira Sans";
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnSKzeShf6TF0.woff2)
    format("woff2");
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: "Fira Sans";
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnSKzeRRf6TF0.woff2)
    format("woff2");
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: "Fira Sans";
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnSKzeSRf6TF0.woff2)
    format("woff2");
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1,
    U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329,
    U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: "Fira Sans";
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnSKzeSBf6TF0.woff2)
    format("woff2");
  unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
    U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: "Fira Sans";
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/firasans/v17/va9B4kDNxMZdWfMOD5VnSKzeRhf6.woff2)
    format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191,
    U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
</style>
