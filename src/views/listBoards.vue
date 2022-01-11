<template>
<div class="listBoards">
  <ul>
    <li @click="$router.push({name:'Boards',params:{  id: board._id }})" v-for="board in boards">{{board.name}}</li>
  </ul>
</div>
  <div class="add-boards">
    <input type="text" v-model="newBoard" placeholder="Название доски">
    <input type="text" v-model="columnForAdd" placeholder="Поля для доски">
    <span v-if="columnsForAdd.length" v-for="item in columnsForAdd">{{ item }}, </span>
    <button type="button" @click="addColumnsForAdd">Добавить поле</button>
    <button type="button" :disabled="disabledAddBoards" @click="addNewBoard()">Add Board</button>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "listBoards",
  data(){
    return {
      newBoard: '',
      columnsForAdd: [],
      columnForAdd: '',
    }
  },
  methods:{
    addColumnsForAdd() {
      this.columnsForAdd.push(this.columnForAdd)
      this.columnForAdd = ''
    },
    async addNewBoard() {
      await this.addBoard({idUser: localStorage.id, name: this.newBoard, columns: this.columnsForAdd})
      this.newBoard = ''
      this.columnsForAdd = []

    },
  },
computed:{
    ...mapGetters(['boards']),
  disabledAddBoards() {
    if(this.columnsForAdd.length && this.newBoard) {
      return false
    }
    return true
  },
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
li:hover{
color: #42b983;
}
</style>