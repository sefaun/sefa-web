import axios from 'axios'
import store from '../store'

const apiClient = axios.create({
    baseURL: store.state.ipler,
    withCredentials: false,
})

export default {
    giris(obj) {
        return apiClient.post(`/admin/giris`, obj)
    },
    kayit_ol(obj2) {
        return apiClient.post('/admin/kayit', obj2)
    }
}