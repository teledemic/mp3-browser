import Vue from 'vue'
import App from './App'
import router from './router'
import VueAnalytics from "vue-analytics";

Vue.config.productionTip = false

Vue.use(VueAnalytics, {
  id: "UA-2956540-2",
  router,
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
