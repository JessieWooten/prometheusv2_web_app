// Import Vue
import Vue from 'vue'
import Axios from 'axios'
import VeeValidate from 'vee-validate'
import VueAxios from 'vue-axios'
import Hammerjs from 'hammerjs'
import VueTouch from 'vue-touch'
import Framework7 from 'framework7'
import Framework7Vue from 'framework7-vue'
import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css'
//OR for Material Theme:
//import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
//import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'
import './styles/main.scss'
import '../static/font-awesome-4.7.0/css/font-awesome.min.css'


// Import Routes
import Routes from './routes.js'

// Import App Component
import App from './app'

// Init F7 Vue Plugin
Vue.use(Framework7Vue)
Vue.use(VueAxios, Axios)
Vue.use(VeeValidate)
Vue.use(VueTouch)

// Init App
window.vue = new Vue({
  el: '#app',
  template: '<app/>',
  // Init Framework7 by passing parameters here
  framework7: {
    root: '#app',
    /* Uncomment to enable Material theme: */
     material: false,
    routes: Routes,
  },
  // Register App Component
  components: {
    app: App
  },
});
