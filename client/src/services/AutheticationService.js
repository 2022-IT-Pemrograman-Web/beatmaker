/* eslint-disable */
import Api from '@/services/Api'

export default {
    register (credentials) {
        return Api().post('register', credentials);
    },
    getInstrument (name) {
        return Api().get('/getInstrument/:id', name);
    }
}