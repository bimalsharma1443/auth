import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import Dashboard from "@/views/Dashboard.vue";
import UserRegistration from "@/views/UserRegistration.vue";
import UserLogin from "@/views/UserLogin.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: { requiredAuth: true }
    },
    {
      path: "/user-registration",
      name: "register",
      component: UserRegistration
    },
    {
      path: "/user-login",
      name: "login",
      component: UserLogin
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiredAuth)) {
    const userData = localStorage.getItem("user");
    if (!userData) {
      next("/");
    }
  }
  next();
});

export default router;
