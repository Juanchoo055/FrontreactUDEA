import axios from 'axios'

export class proyectos{
    baseUrl = "http://localhost:5000/users/"
    getAll(){
        return axios.get(this.baseUrl + "all").then(res => res.data.data);
    }
}