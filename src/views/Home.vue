<template>
  <div class="home">
    <h1>Home</h1>
    <div class="content">Доска дел</div>
    <div class="content">Удобный интерфейс</div>
    <div class="content">Миллионы пользователей уже попробовали</div>
    <div v-if="!jwt">
      <button @click="$router.push({path:'/register'})">Регистрация</button>
      <button  @click="$router.push({path:'/login'})">Войти</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Home',
  computed:{
    jwt(){
      return localStorage.jwt
    }
  }
}
</script>
<style>
.content{
  margin-bottom: 5px;
  max-width: 700px;
  border-radius: 10%;
  margin-left: auto;
  margin-right: auto;
  background: #105fa9;
  color: #f56161;
  font-size: 36px;
  font-weight: 700;
}
.home{
  background-image:url("../assets/097e56a3746e48988d8fbe58c6ad7e76.jpg") ;
  min-height: 95vh;
}
</style>
