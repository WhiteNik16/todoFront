<template>
<div>
  <div class="add-boards">
    <input type="text" v-model="newBoard" placeholder="Название доски">
    <input type="text" v-model="columnForAdd" placeholder="Поля для доски">
    <ul> <li v-if="columnsForAdd.length" v-for="(item, index) in columnsForAdd">{{ item }},<button @click="deleteCollumn(index)">Del</button> </li> </ul>

    <button type="button" @click="addColumnsForAdd">Добавить поле</button>
    <button type="button" :disabled="disabledAddBoards" @click="addNewBoard()">Add Board</button>
  </div>
</div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "addBoards",
  data(){
    return {
      newBoard: '',
      columnsForAdd: ['Start', 'Dev', 'End'],
      columnForAdd: '',
    }
  },
  methods:{
    ...mapActions(['addBoard']),
    addColumnsForAdd() {
      this.columnsForAdd.push(this.columnForAdd)
      this.columnForAdd = ''
    },
    async addNewBoard() {
      await this.addBoard({idUser: localStorage.id, name: this.newBoard, columns: this.columnsForAdd})
      this.newBoard = ''
      this.columnsForAdd = []

    },
    deleteCollumn(ind){
      this.columnsForAdd.splice(ind, 1)
    }
  },
  computed:{
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


</style>