<template>
  <div >
  <div class="board" v-if="boards && users">
    <div v-for="(board, index) in boards.filter(x => x._id == $route.params.id)"
         :key="board._id"
         class="board_droppable"
    >
      <h4>{{ board.name }}</h4>
      <button @click="deleteBoard(board._id)">Delete Board</button>
      <h6>Author:{{ board.author }}</h6>
      <button @click="isVisiableSelect=!isVisiableSelect">список</button>
      <select v-if="isVisiableSelect" v-model="idCandidateAccess">
        <option v-for="user in users" :key="user._id" :value="user._id">{{ user.username }}</option>
      </select>
      <button v-if="isVisiableSelect" @click="addAccess(board._id)">Выбрать</button>
      <div class="board_columns" v-for="column in board.columns"
           @drop="onDrop($event, index, column)"
           @dragover.prevent
           @dragenter.prevent><h6>{{ column }}</h6>
        <div v-for="item in board.todosList.filter(x => x.column == column)"
             @dragstart="onDragStart($event, item, board._id,)"
             class="board_draggable "
             draggable="true">
          <span :style="[{'color':item.done? '#6ab942':'#b94242'}]">{{ item.todo }}</span>
          <i :class="['fa', item.done?'fa-times':'fa-check']" aria-hidden="true"
             @click="toggleStatusTodos({todoId:item._id, boardId:board._id})"></i>
          <br/>
          <span v-if="item.assignUser">Assigned:{{item.assignUser.username}}</span>

          <div><button @click="isVisiableAssignUser=!isVisiableAssignUser">assign user</button></div>
          <div class="board_select-Assign" v-if="isVisiableAssignUser">
            <select  v-model="idCandidateAssign">
              <option v-for="user in users.filter(x => board.accessUser.includes(x._id))" :key="user._id" :value="user._id">{{ user.username }}</option>
            </select>
            <button @click="addAssignUser(board._id,item._id)">assign</button>
          </div>

          <br/>
          <button @click="deleteTodos({todoId:item._id, boardId:board._id})">Delete</button>
        </div>
      </div>
      <input type="text" v-model="newTodos">
      <div class="board_todo-add" v-for="item in board.columns" v-if="newTodos">
        <input :value="item" type="radio" id="selectColumn" v-model="columnForTodos">
        <label for="selectColumn">{{ item }}</label></div>

      <button type="button" @click="addTodo(board._id)" :disabled="disabledAddTodos">Add Todo</button>
    </div>


  </div>
    <div v-else class="loader"><h1>Loading</h1></div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {api} from "@/api/config";
import login from "@/components/login";

export default {
  name: 'App',
  data() {
    return {
      newTodos: '',

      isVisiableSelect: false,
      idCandidateAccess: '',

      columnForTodos: '',
      isVisiableAssignUser: false,
      idCandidateAssign:'',
    }
  },
  methods: {
    ...mapActions(['getBoards', 'deleteTodos', 'addTodos', 'addBoard', 'toggleStatusTodos', 'getUsers']),

    async addAssignUser(idBoard, todoId){
     await api.post('/todo/assignUser',{todoId, idUser:this.idCandidateAssign, idBoard})
      this.idCandidateAssign = ''
      await this.getBoards()
    },
    async deleteBoard(idBoard) {
      await api.post('/todo/deleteBoard', {id: idBoard}, {
        params: {
          id: localStorage.id
        }
      })
      await this.getBoards()
    },

    async addTodo(id) {
      console.log(id)
      await this.addTodos({idBoard: id, name: this.newTodos, columns: this.columnForTodos})
      this.newTodos = ''
      this.columnForTodos = ''


    },
    async addAccess(idBoards) {
      if (this.idCandidateAccess !== localStorage.id) {
        await api.post('/todo/addAccess', {idBoard: idBoards, idUser: this.idCandidateAccess})
        this.isVisiableSelect = !this.isVisiableSelect
      } else {
        this.isVisiableSelect = !this.isVisiableSelect
        throw new Error('Нельзя добавить себя')

      }
    },
    onDragStart(e, item, boardId) {
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('item', item._id)
      e.dataTransfer.setData('boardId', boardId)
    },
    async onDrop(e, parentBoardId, column) {
      const IdItem = e.dataTransfer.getData('item')
      const boardId = e.dataTransfer.getData('boardId')
      let boardInd = this.boards.findIndex(ind => ind._id == boardId)
      let itemInd = this.boards[boardInd].todosList.findIndex(i => i._id == IdItem)

      await api.post('/todo/deleteTodo', {todoId: IdItem, boardId: boardId})
      let addResponse = await api.post('/todo/addTodo', {
        id: this.boards[parentBoardId]._id.toString(),
        todo: this.boards[boardInd].todosList[itemInd].todo,
        columns: column
      })
      this.boards[boardInd].todosList[itemInd].column = column
      this.boards[boardInd].todosList[itemInd]._id = addResponse.data
      this.boards[parentBoardId].todosList.push(this.boards[boardInd].todosList[itemInd])
      this.boards[boardInd].todosList.splice(itemInd, 1)


    }

  },
  computed: {
    ...mapGetters(['boards', 'users']),

    disabledAddTodos() {
      return !(this.columnForTodos && this.newTodos);

    }
  },

}
</script>

<style scoped>
h6 {
  color: aliceblue;
}

label {
  color: #42b983;
}

.board_droppable {
  padding: 15px;
  max-width: 700px;
  border-radius: 5px;
  background: #2c3e50;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
}

.droppable h4 {
  color: white;
}

.board_draggable {
  max-width: 60%;
  margin-left: auto;
  margin-right: auto;
  background: white;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 5px;
}

.draggable h5 {
  margin: 0;
}

.board_columns {
  background: #517a9d;
  min-height: 50px;
}
</style>