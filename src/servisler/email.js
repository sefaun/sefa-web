import axios from 'axios'
import store from '../store'

const apiClient = axios.create({
    baseURL: store.state.ipler,
    withCredentials: false,
    /*headers: {
        'Authorization': `Bearer ` + localStorage.getItem('token')
    }*/
})

export default {
    addemail(obj) {
        return apiClient.post(`/email/addemail`, obj)
    },
    getemail() {
        return apiClient.get('/email/getemail')
    }
}