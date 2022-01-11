import { createStore } from 'vuex'
import axios from "axios";
import actions from "@/store/actions";
import mutations from "@/store/mutations";
import getters from "@/store/getters";

export default createStore({
  state: {
    boards: [],
    users:null,
  },
  mutations,
  actions,
  getters

})
