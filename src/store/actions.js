import axios from "axios";
import {api} from "@/api/config";

export default {
    async deleteTodos({dispatch}, {todoId, boardId}){
        await api.post('/todo/deleteTodo', {todoId:todoId, boardId:boardId})
        dispatch('getBoards')
    },
    async toggleStatusTodos({dispatch}, {todoId, boardId}){
      await api.post('/todo/toggleStatusTodo', {todoId, boardId})
        dispatch('getBoards')
    },
    async addBoard({dispatch},{idUser, name, columns}){
        await api.post('/todo/addBoard',{name:name, columns},{
            params:{
                id:idUser
            }
        })
        dispatch('getBoards')
    },
    async addTodos({dispatch}, {idBoard, name, columns}){
        await api.post('/todo/addTodo',{id:idBoard, todo:name, columns})
        dispatch('getBoards')
    },
    async getUsers({commit}){
      const users = await api.get('/auth/getUsers')
        commit('ADD_USERS', users)
    },
    async getTodos({commit}, board){
        // console.log(board)
        let todos = await api.post('/todo/getTodo', {id:board._id})
        board.author = todos.data.author
        board.accessUser = todos.data.accessUser
        // console.log(board,'1')
        for(let item of todos.data.todosList){
            board.todosList.push(item)

        }
        // console.log(board)
        commit('SET_BOARDS', board)
    },

    async getBoards({dispatch, commit}){
        commit('CLEAN_BOARDS')
        let board = await api.get('/todo/getBoards',{
            params:{
                id: localStorage.id
            }
        })

        for (let item of board.data){

            dispatch('getTodos', item)
        }

    }

}