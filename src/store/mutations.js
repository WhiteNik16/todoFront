export default {
    SET_BOARDS(state, board){
        state.boards.push(board)
        state.boards.sort(function(a, b){
            let nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
            if (nameA < nameB) //сортируем строки по возрастанию
                return -1
            if (nameA > nameB)
                return 1
            return 0 // Никакой сортировки
        })
    },
    CLEAN_BOARDS(state){
        state.boards=[]
    },
    ADD_USERS(state, users){
      state.users = users.data
    },
}
