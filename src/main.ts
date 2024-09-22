import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import {createPinia} from "pinia";
import './styles/global.scss';
import './styles/color.scss';
import './styles/typography.scss';
import 'vue3-snackbar/styles';
import 'v-calendar/style.css';

import {QueryClient, VueQueryPlugin} from "vue-query";


const queryClient = new QueryClient();
import '@vuepic/vue-datepicker/dist/main.css'
import {createNaverMap} from "vue3-naver-maps";
import {SnackbarService} from "vue3-snackbar";
import VCalendar, {Calendar, DatePicker, setupCalendar} from 'v-calendar';

const app = createApp(App);

app
.use(router)
.use(vuetify)
.use(createPinia())
.use(VCalendar, {})
.use(VueQueryPlugin, {queryClient})
.use(SnackbarService)
.use(createNaverMap, {
  clientId: process.env.VUE_APP_NAVER_MAP_CLIENT_ID, // Required
  category: "ncp", // Optional
  subModules: ["geocoder"], // Optional
})
.use(setupCalendar, {})
.component('VCalendar', Calendar)
.component('VDatePicker', DatePicker)
.mount('#app')
