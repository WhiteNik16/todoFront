import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import registration from "@/components/registration";
import login from "@/components/login";
import boards from "@/views/Boards";
import listBoards from "@/views/listBoards";
import addBoards from "@/views/addBoards";


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/listBoards',
    name: 'listBoards',
    component: listBoards
  },
  {
    path: `/boards/:id`,
    name: 'Boards',
    component: boards,
    props: true,
  },
  {
    path: '/addBoards',
    name: 'addBoard',
    component: addBoards
  },
  {
    path: '/register',
    name: 'registration',
    component:registration,
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
