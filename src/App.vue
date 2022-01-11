<template>
  <div id="nav">
    <router-link  to="/">Home </router-link>
    <router-link v-if="jwt" to="/listBoards">Boards </router-link>
    <router-link v-if="!jwt" to="/register"> Registration</router-link>
    <router-link v-if="!jwt" to="/login">| Login </router-link>
      <button v-if="jwt" @click="unlogin">Exit</button>
  </div>
  <router-view/>

</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script>
import router from "@/router/router";
import {mapActions} from "vuex";

export default {
  components: {},
  methods:{
    ...mapActions(['getUsers', 'getBoards']),
    unlogin(){
    localStorage.removeItem('jwt'),
    localStorage.removeItem('id')
      router.push({name:'login'}).then(()=>{
        location.reload()
      })

    }
  },
  created() {
    if(localStorage.id){
      this.getUsers()
      this.getBoards()

    }
  },

  computed:{
    jwt(){
      return localStorage.jwt
    }
  },

}
</script>