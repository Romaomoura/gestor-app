import React from 'react';

import Card from '../components/card';
import FormGroup from '../components/form-group';
import { withRouter } from 'react-router-dom';

import axios from 'axios';

class Login extends React.Component {

    state = {
        email: '',
        senha: '',
    mensagemErro : null
    }

    entrar = () => {
        axios.post('http://localhost:8080/api/usuarios/autenticar',
        {
            email: this.state.email,
            senha: this.state.senha
        }).then((response) => {
            localStorage.setItem('_usuario_logado', JSON.stringify(response.data))
            this.props.history.push("/home")
        }).catch((error) => {
            this.setState({mensagemErro: error.response.data})
    })
}

    prepareCadastrar = () => {
        this.props.history.push('/cadastro-usuario')
    }

    render() {
        return (
        <div className="row">
            <div className="col-md-6" style={ {position: 'relative', left: '300px'}}>
                <div className="bs-docs-section">
                    <Card title="Login">
                        <div className="row">
                            <div className="row">
                                <span>{this.state.mensagemErro}</span>
                            </div>  
                            <div className="col-lg-12">
                                <div className="bs-component">
                                    <fieldset>
                                        <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                            <input type="email" className="form-control" 
                                                    value={this.state.email}
                                                    onChange={e => this.setState({ email: e.target.value })}
                                                    id="exampleInputEmail1" 
                                                    aria-describedby="emailHelp" 
                                                    placeholder="Digite o Email"/>
                                        </FormGroup>
                                        <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                            <input type="password" className="form-control" 
                                                        value={this.state.senha}
                                                        onChange={e => this.setState({ senha: e.target.value })}
                                                    id="exampleInputPassword1" 
                                                    placeholder="Digite sua senha"/>
                                        </FormGroup>
                                    </fieldset>
                                    <button onClick={this.entrar} type="button" className="btn btn-outline-success">Entrar</button>
                                    <button onClick={this.prepareCadastrar} type="button" className="btn btn-outline-danger">Cadastrar</button>
                                </div>
                            </div>
                        </div>
                    </Card> 
                </div>
            </div>
        </div>
       )
    }
}

export default withRouter( Login ) 