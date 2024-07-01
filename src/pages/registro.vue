<script setup lang="ts">
import axios from 'axios'
import { setLocale, object, string} from 'yup'
import { ref as yupRef } from 'yup';
// import { vMaska } from "maska"


const router = useRouter()

const adm = ref(false)

function pushToLogin() {
  router.push({ path: "/login" });
}

const getParameterByName = (
  name: any,
  url?: any
): string | null | undefined => {
  if (!url) url = window.location.href
  name = name.replace(/[\[\]]/g, '\\$&')
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url)
  console.log('results:', results)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

setLocale({
  mixed: {
    required: 'Campo obrigatório'
  },
  string: {
    email: 'Insira um email válido',
    min: 'Insira um número de telefone com DDD',
    max: 'Insira um número de telefone no máximo 11 dígitos'
  }
})

const validationSchema = object({
  name: string().required(),
  email: string().required().email(),
  password: string().required(),
  confirmPassword: string()
    .required('Confirmação de senha é obrigatória')
    .oneOf([yupRef('password'), null], 'As senhas devem coincidir'),
  phone: string().required().min(10).max(11)
})

const { errors, handleSubmit, isSubmitting } = useForm({
  validationSchema
})

const { value: name } = useField<string>('name')
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
const { value: confirmPassword } = useField<string>('confirmPassword')
const utmSource = getParameterByName('utm_source')
const { value: phone } = useField<string>('phone')
const showAlert = ref(false)
const failedToSubmit = ref(false)
const showErrorStyles = computed(() => failedToSubmit.value && showAlert.value)
const showSuccessStyles = computed(
  () => !failedToSubmit.value && showAlert.value
)
const onSubmit = handleSubmit(async (values) => {
  const formValues = {
    phoneNumber: phone.value,
    email: email.value,
    name: name.value,
    role: 'USER',
    password: password.value,
  }

  try {
    const response = await axios.post(
      'http://localhost:8080/api/auth/signup',
      formValues
    )
    setInterval(() => {
      if (response.status === 200) {
        pushToLogin()
    }
    }, 2000)

    localStorage.setItem('sentForm', 'true')
    failedToSubmit.value = false
  } catch (error) {
    failedToSubmit.value = true
  } finally {
    showAlert.value = true
  }
})
</script>

<template>
  <section
    class="flex justify-center items-center bg-form px-6 lg:px-[4rem] xl:px-[10rem] py-10 lg:py-20 h-screen"
  >
    <div
      class="lg:py-16 md:py-0 flex-col lg:flex-row h-full flex items-center justify-center max-w-[50rem]"
    >
      <div class="flex flex-col text-center lg:text-start">
        <h2
          class="mb-4 lg:mb-12 text-orion-display-sm text-orion-neutrals-500 font-semibold"
        >
          Preparado para acelerar a sua jornada?
        </h2>
        <p class="text-orion-label-lg text-orion-neutrals-500">
          Conte com a parceria da orion
        </p>
      </div>
      <form
        class="flex flex-col flex-wrap gap-[1.81rem] py-4 lg:py-14 md:py-8 md:px-8 w-full max-w-[400px]"
        @submit.prevent="onSubmit"
      >
        <div class="form-control w-full md:w-[400px] mb-4">
          <label class="label p-0 pb-1">
            <span
              class="label-text text-orion-title-md font-medium text-orion-neutrals-500"
              >Nome</span
            >
          </label>
          <input
            v-model.trim="name"
            type="text"
            placeholder="Digite seu nome"
            class="bg-orion-secondary-500 border-b-2 border-orion-secondary-300 focus:bg-white focus:text-orion-primary-500 input rounded-none border-0 placeholder:text-grey focus:outline-none focus:ring-0 focus:border-orion-primary-500 outline-offset-0"
            :class="name ? 'text-white' : 'border-orion-primary-500'"
            id="form-name"
          />
          <span v-if="errors.name" class="text-orion-body-sm text-error ml-1">{{
            errors.name
          }}</span>
        </div>
        <div class="form-control w-full md:w-[400px] mb-4">
          <label class="label p-0 pb-1">
            <span
              class="label-text text-orion-title-md font-medium text-orion-neutrals-500"
              :class="email ? '' : 'border-orion-primary-500'"
              >E-mail</span
            >
          </label>
          <input
            v-model.trim="email"
            type="email"
            class="bg-orion-secondary-500 border-b-2 border-orion-secondary-300 focus:bg-white text-white focus:text-orion-primary-500 input rounded-none border-0 placeholder:text-grey focus:outline-none focus:ring-0 focus:border-orion-primary-500 outline-offset-0"
            placeholder="Digite um e-mail válido"
            id="form-email"
            :class="errors.email ? 'border-error' : 'border-orion-primary-500'"
          />
          <span v-if="errors.email" class="text-orion-body-sm text-error ml-1">{{
            errors.email
          }}</span>
        </div>
        <div class="form-control w-full md:w-[400px] mb-2">
          <label class="label p-0 pb-1">
            <span
              class="label-text text-orion-title-md font-medium text-orion-neutrals-500"
              >Senha</span
            >
          </label>
          <input
            v-model.trim="password"
            type="password"
            placeholder="Digite sua senha"
            class="bg-orion-secondary-500 border-b-2 border-orion-secondary-300 focus:bg-white focus:text-orion-primary-500 input rounded-none border-0 placeholder:text-grey focus:outline-none focus:ring-0 focus:border-orion-primary-500 outline-offset-0"
            :class="password ? 'text-white' : 'border-orion-primary-500'"
            id="form-password"
          />
          <span v-if="errors.password" class="text-orion-body-sm text-error ml-1">{{
            errors.password
          }}</span>
        </div>
                <div class="form-control w-full md:w-[400px] mb-2">
          <label class="label p-0 pb-1">
            <span
              class="label-text text-orion-title-md font-medium text-orion-neutrals-500"
              >Confirme sua Senha</span
            >
          </label>
          <input
            v-model.trim="confirmPassword"
            type="password"
            placeholder="Digite sua senha"
            class="bg-orion-secondary-500 border-b-2 border-orion-secondary-300 focus:bg-white focus:text-orion-primary-500 input rounded-none border-0 placeholder:text-grey focus:outline-none focus:ring-0 focus:border-orion-primary-500 outline-offset-0"
            :class="confirmPassword ? 'text-white' : 'border-orion-primary-500'"
            id="form-confirmPassword"
          />
          <span v-if="errors.confirmPassword" class="text-orion-body-sm text-error ml-1">{{
            errors.confirmPassword
          }}</span>
        </div>
        <div class="form-control w-full md:w-[400px] mb-4">
          <label class="label p-0 pb-1">
            <span
              class="label-text text-orion-title-md font-medium text-orion-neutrals-500"
              :class="phone ? '' : 'border-orion-primary-500'"
              >Telefone</span
            >
          </label>
          <input
            v-model.trim="phone"
            type="text"
            class="bg-orion-secondary-500 border-b-2 border-orion-secondary-300 focus:bg-white text-white focus:text-orion-primary-500 input rounded-none border-0 placeholder:text-grey focus:outline-none focus:ring-0 focus:border-orion-primary-500 outline-offset-0"
            placeholder="(XX) XXXXX-XXXX"
            id="form-phone"
            :class="errors.phone ? 'border-error' : 'border-orion-primary-500'"
          />

          <span v-if="errors.phone" class="text-orion-body-sm text-error ml-1">{{
            errors.phone
          }}</span>
        </div>
        <div class="flex flex-col justify-center items-center">
          <button
            id="sendButton"
            class="py-[0.88rem] px-4 border border-orion-secondary-50 hover:bg-orion-primary-500 hover:text-orion-secondary-50 hover:border-transparent font-medium text-orion-secondary-50 w-full transition duration-200"
            :class="{
              'loading': isSubmitting,
              'btn-error': showErrorStyles,
              'btn-success': showSuccessStyles
            }"
          >
            <h2 class="normal-case text-orion-subtitle-sm">Registrar</h2>
          </button>
          <span @click="pushToLogin()" class="text-orion-body-sm text-orion-primary-50 mt-5 hover:text-orion-primary-500" style="cursor: pointer">
            Já possui conta? Logue aqui
          </span>
        </div>
        <div
          v-if="showAlert"
          class="mt-4 rounded-none alert"
          :class="{
            'alert-error': showErrorStyles,
            'alert-success': showSuccessStyles
          }"
        >
          <div class="flex-1">
            <label class="mx-3">{{
              failedToSubmit
                ? 'Um erro ocorreu ao se registrar :('
                : 'Registrado com sucesso!'
            }}</label>
          </div>
          <div class="flex-none">
            <button class="btn btn-sm btn-primary" @click="showAlert = false">
              Ok
            </button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<style>
.bg-container {
  background: url('/src/assets/bg-container.jfif'),
    lightgray -56.174px -130.625px / 128.472% 147.397% no-repeat,
    rgba(15, 13, 13, 0.9);
  background-blend-mode: multiply, normal;
}
</style>
<style>
.bg-form {
  background-image: url('/src/assets/bgs/bgform.png');
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
