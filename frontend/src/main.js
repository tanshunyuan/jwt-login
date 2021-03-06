import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { getItem } from './service/local';
import { isTokenValid } from './service/jwt';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const jwt = getItem('jwt');
    const isTokenVal = isTokenValid(jwt);
    console.log('isTokenValid ==> ', isTokenVal);
    if (jwt != null && isTokenVal) {
      next();
    } else {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath },
      });
    }
  } else {
    next();
  }
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
