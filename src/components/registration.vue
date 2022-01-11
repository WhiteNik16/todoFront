<template>
<div>
  <input type="text" v-model="user.username"><br/>
  <input type="password" v-model="user.password"><br/>
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