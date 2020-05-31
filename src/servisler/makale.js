import axios from 'axios'
import store from '../store'

const apiClient = axios.create({
    baseURL: store.state.ipler,
    withCredentials: false,
    headers: {
        'Authorization': `Bearer ` + store.state.token
    }
})

export default {
    addmakale(obj) {
        return apiClient.post(`/makale/addmakale`, obj)
    },
    getmakale() {
        return apiClient.get('/makale/getmakale')
    },
    getmakale_detayi(makale_id) {
        return apiClient.get(`/makale/getmakale/detay?id=${makale_id}`)
    }
}