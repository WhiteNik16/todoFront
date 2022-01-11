import axios from 'axios'
import { tokenInterceptor } from '@/api/interceptors'

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: false,
})

api.interceptors.request.use(tokenInterceptor)

export { api }