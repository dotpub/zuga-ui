import Vue from 'vue'
import App from './Example'
import routes from './router'
import VueRouter from 'vue-router';
import Zui from '@/src/index';

Vue.use(Zui)
Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  routes
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
})

let indexScrollLeft = 0;
router.beforeEach((route, redirect, next) => {
  var wrap = document.getElementsByClassName('mn-support');
  if (route.path !== '/') {
    indexScrollLeft = wrap[0].scrollLeft = 0;
  }
  document.title = route.meta.title || document.title;
  next();
});

router.afterEach(route => {
  var wrap = document.getElementsByClassName('mn-support');
  if (route.path !== '/') {
    wrap[0].scrollLeft = 0;
  } else {
    Vue.nextTick(() => {
      wrap[0].scrollLeft = indexScrollLeft;
    });
  }
});
