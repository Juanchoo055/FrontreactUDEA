import axios from 'axios'

export class usuariosService{
    baseUrl = "http://localhost:5000/users/"
    getAll(){
        return axios.get(this.baseUrl).then(res => res.data);
    }
}