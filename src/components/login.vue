<template>
  <div>
    <label for="login">Username: </label>
    <input type="text" id="login" placeholder="Username" v-model="user.username"><br/>
    <label for="password">Password: </label>
    <input type="password" id="password" placeholder="password" v-model="user.password"><br/>
    <button @click="login">Login</button>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router/router";

export default {
  name: "Login",
  data(){
    return{
      user:{
        username:'',
        password:'',
      }
    }
  },
  methods:{
    login(){
      axios.post('http://localhost:3000/auth/login', {username:this.user.username, password:this.user.password}).then((res)=>{
        console.log(res)

        localStorage.jwt = res.data.token
        localStorage.id = res.data.id
        router.push({path:'/'}).then(()=>{
          location.reload()
        })


      }).catch((e) =>{
        console.log(e)
      })
    }
  }
}
</script>

<style scoped>

</style>