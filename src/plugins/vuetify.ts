// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import ko from 'date-fns/locale/ko';

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  date: {
    locale: ko,
  }
})
