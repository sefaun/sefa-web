import axios from 'axios'
import store from '../store'

const apiClient = axios.create({
    baseURL: store.state.ipler,
    withCredentials: false,
    /*headers: {
        'Authorization': `Bearer ` + store.state.token
    }*/
})

export default {
    addmakale_yorum(idm, obj) {
        return apiClient.post(`/makaleyorum/addmakale_yorum?makale_id=${idm}`, obj)
    },
    getmakale_yorum(id) {
        return apiClient.get(`/makaleyorum/getmakale_yorum?makale_id=${id}`)
    }
}