import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import App from "../App.vue";
const routes = [
    { path: "/", component: App },
    { path: "/login", component: Login },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
