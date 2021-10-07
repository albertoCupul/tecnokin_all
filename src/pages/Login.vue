<template>
  <q-page class="flex flex-center bg-grey-1">
    <div
      class="
        q-pa-lg
        bg-white
        rounded-borders
        row
        justify-center
        q-gutter-md
        border_fine
        shadow-2
      "
      style="width: 600px"
    >
      <div class="column items-center" style="width: 100%" v-if="skeleton">
        <q-skeleton type="QAvatar" class="q-my-md"></q-skeleton>
        <q-skeleton
          type="QInput"
          class="q-my-md"
          style="width: 100%"
        ></q-skeleton>
        <q-skeleton
          type="QInput"
          class="q-my-md"
          style="width: 100%"
        ></q-skeleton>
        <q-skeleton type="QBtn" style="width: 30%"></q-skeleton>
      </div>

      <div class="column items-center" style="width: 100%" v-else>
        <q-img
          fit="contain"
          :src="url"
          spinner-color="amber-12"
          style="max-width: 200px; height: 150px"
        ></q-img>
        <q-input
          v-model="user"
          label="Usuario"
          class="q-py-md"
          clearable
          autofocus
          style="width: 100%"
          :rules="Rule"
          ref="usuario"
          @keyup.enter="nextInput(1)"
        />
        <q-input
          v-model="pwd"
          label="Contraseña"
          class="q-py-md"
          style="width: 100%"
          :rules="Rule"
          :type="isPwd ? 'password' : 'text'"
          ref="password"
          @keyup.enter="nextInput(2)"
        >
          <template #append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <q-btn
          color="primary"
          icon="login"
          label="Iniciar Sesión"
          class="q-my-md"
          :loading="loading"
          @click="validar"
        >
          <template #loading>
            <q-spinner-gears class="on-left" />
            Validando...
          </template>
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted , ref } from "vue";
import { Screen , Notify } from "quasar";
import { api } from "../boot/axios";
import {
  validateToken,
  // eslint-disable-next-line no-unused-vars
  redireccionar,
  existToken,
  deleteToken,
} from "../javascript/auth/validateToken";
import {saveToken, saveData, getToken} from "../javascript/auth/dataManagment"

export default defineComponent({
  name: "PageIndex",
  setup() {
    // eslint-disable-next-line global-require
    const url = require("../assets/logos/logo_md.png");
    const user = ref(null);
    const userRef = ref(null);
    const pwd = ref(null);
    const pwdRef = ref(null);
    const loading = ref(false);
    const isPwd = ref(true);
    const tokenName = ref("session");
    const skeleton = ref(true);

    async function sendRequest(obj) {
      try {
        const response = await api.post("/login/validate/", obj);
        if (response.data.HTTP !== 100) {
          Notify.create({
            message: "Datos incorrectos. Favor de validar.",
            color: "blue",
            textColor: "grey-3",
            icon: "report",
          });
          loading.value = false;
        } else { 
          saveToken(tokenName.value, response.data.Token)
          saveData('user', obj.user)               
          // redireccionar("/start");
        }
      } catch (error) {
        // console.error(error);
        Notify.create({
          message: "Servidor fuera de línea. Favor de reintentar más tarde.",
          color: "red",
          textColor: "grey-3",
          icon: "report",
        });
        loading.value = false;
      }
    }

    function validar() {
      loading.value = true;
      if (!user.value && !pwd.value) {
        Notify.create({
          message: "Los campos de usuario y password no pueden estar vacíos.",
          color: "red-9",
          textColor: "grey-3",
          icon: "report",
        });
        loading.value = false;
      } else {
        const json = {
          user: user.value,
          pwd: pwd.value,
        };
        sendRequest(json);
      }
    }    
    function nextInput(valor) {
      if (valor === 1) {
        this.$refs.password.focus();
      } else {
        validar();
      }
    }
    onMounted(async () => {     
      if (existToken(tokenName.value)) {
        const isAuth = await validateToken(
          getToken(tokenName.value),          
          true
        );
        switch (isAuth) {
          case 1:
          case 2:
          case 3:
            deleteToken(tokenName.value);            
            break
          default:          
            // eslint-disable-next-line no-console
            console.log(isAuth)
            redireccionar("/start");
            break;
        }
      } else {
        skeleton.value = false;
      }
    });

    return {
      url,
      Screen,
      user,
      userRef,
      Rule: [(val) => (val && val.length > 0) || "* Campo requerido"],
      pwd,
      pwdRef,
      isPwd,
      loading,
      validar,
      skeleton,
      nextInput,
    };
  },
});
</script>

/*** si isAuth es 1,2,3 hay que borrar el token, variables localesy redireccionar al login  ya que se debe recibir siempre toda la información del usuario ***/
/*** recuperar datos de usuario en validateToken, registrar en local negocio, sucursal, cajero logueado. Tanto en login normal como por token 
redireccionar posteriormente a /start ***/
