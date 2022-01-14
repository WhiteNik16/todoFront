<template>
<div>
  <label for="login">Username: </label>
  <input id="login" type="text" placeholder="username" v-model="user.username"><br/>
  <label id="password" for="password">Password: </label>
  <input type="password" placeholder="password" v-model="user.password"><br/>
  <button @click="registration">Registration</button>
</div>
</template>

<script>
import axios from "axios";
import router from "@/router/router";

export default {
  name: "registration",
  data(){
    return{
      user:{
        username:'',
        password:'',
      }
    }
  },
  methods:{
    registration(){
      axios.post('http://localhost:3000/auth/register', {username:this.user.username, password:this.user.password}).then((res)=>{
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