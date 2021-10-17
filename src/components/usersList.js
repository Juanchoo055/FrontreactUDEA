import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default class usersList extends Component {
    constructor() {
        super();
        this.state = {
        usuarios: [],
        name: "",
        email: "",
        password: "",
        age: "",
        editing: false,
        _id:''
        };
    }

    componentDidMount() {
        this.getUsers();
    }


    async getUsers() {
        const res = await axios.get('http://localhost:5000/users')
        this.setState({usuarios: res.data})
    }

    handleChange = (e) => {
        this.setState({
        [e.target.name]: e.target.value,
        });
    };

    deleteUser = async (id) => {
        await axios.delete('http://localhost:5000/users/delete/' + id)
        this.getUsers();
    };

    updateUser = async(id) =>{
        const res = await axios.get('http://localhost:5000/users/' + id)
        id = res.data._id
        this.setState({
            name: res.data.name,
            email: res.data.email,
            password: res.data.password,
            age: res.data.age,
            editing: true,
            _id: id
        })
        
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            age: this.state.age,
            };
        console.log(this.state.editing, this.state._id)
        if(this.state.editing){
            await axios.put('http://localhost:5000/users/update/' + this.state._id, newUser)
        }else{
            await axios.post("http://localhost:5000/users/new", newUser);
        }
        this.getUsers();
    };

    render() {
        return (
        <div>
            <div className="row">
            <div className="col-md-3">
                <div className="card">
                <div className="card-content">
                    <h3>Crear/Modificar Usuario</h3>
                    <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="form-control">
                        <input
                            name="name"
                            onChange={this.handleChange}
                            type="text"
                            placeholder="Nombre Completo"
                            value={this.state.name}
                            required
                        />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-control">
                        <input
                            name="email"
                            onChange={this.handleChange}
                            type="email"
                            placeholder="email"
                            value={this.state.email}
                            className="materialize-textarea"
                            required
                        />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-control">
                        <input
                            name="password"
                            onChange={this.handleChange}
                            type="text"
                            value={this.state.password}
                            placeholder="Password"
                            required
                        />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-control">
                        <input
                            name="age"
                            onChange={this.handleChange}
                            type="text"
                            value={this.state.age}
                            placeholder="Edad"
                            required
                        />
                        </div>
                    </div>
                    <button type="submit" className="btn light-green darken-4">
                        Crear Usuario
                    </button>
                    </form>
                </div>
                </div>
            </div>
            <div className="col-md-9">
                <table class="table">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Password</th>
                    <th scope="col">Age</th>
                    <th scope="col">Buttons</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.usuarios.map(usuarios => {
                            return(
                                <tr>
                                    <td>{usuarios._id}</td>
                                    <td>{usuarios.name}</td>
                                    <td>{usuarios.email}</td>
                                    <td>{usuarios.password}</td>
                                    <td>{usuarios.age}</td>
                                    <td><button type="button" class="btn btn-danger" onClick={() => this.deleteUser(usuarios._id)}>Delete</button>
                                    <Link type="button" class="btn light-green darken-4 btn-dark" to={"/update/" + usuarios._id} onClick={() => this.updateUser(usuarios._id)}>Edit</Link></td>
                                    
                                </tr>
                            )
                        })
                    }
                </tbody>
                </table>
            </div>
            </div>
        </div>
        );
    }
    }
