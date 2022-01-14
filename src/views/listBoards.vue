<template>
<div class="listBoards">
  <ul>
    <li @click="$router.push({name:'Boards',params:{  id: board._id }})" v-for="board in boards">{{board.name}}</li>
  </ul>

</div>
  <button @click="$router.push({name:'addBoard'})">Add Board</button>

</template>

<script>
import { mapGetters} from "vuex";

export default {
  name: "listBoards",
  data(){
    return {
    }
  },

computed: {
  ...mapGetters(['boards']),
}
}
</script>

<style scoped>
.listBoards{
  text-align: start;
  background: #e8c6c6;
  max-width: 50%;
  margin-left: auto;
  margin-right: auto;
}
li{
  font-weight: 700;
  font-size: 20px;
  cursor: pointer;
  margin-bottom: 5px;

}
li:hover {
  color: #42b983;
}
</style>