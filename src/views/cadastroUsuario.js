import React from 'react';

import Card from '../components/card'
import FormGroup from '../components/form-group';
import { withRouter } from 'react-router-dom';

class CadastroUsuario extends React.Component {

    state = {
        nome : '',
        email : '',
        senha : '',
        senhaRepeticao : ''
    }

    cadastrar = () => {
        console.log(this.state)
    }

    prepareVoltar = () => {
        this.props.history.push('/login');
    }

    render() {
        return (
            <Card title="Cadastro de Usuários">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input  type="text" 
                                        id="inputNome" 
                                        name="nome" 
                                        className="form-control"
                                        onChange={e => this.setState({nome: e.target.value})} />
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input  type="email" 
                                        id="inputEmail" 
                                        name="email" 
                                        className="form-control"
                                        onChange={e => this.setState({email: e.target.value})} />
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input  type="password" 
                                        id="inputSenha" 
                                        name="senha" 
                                        className="form-control"
                                        onChange={e => this.setState({senha: e.target.value})} />
                            </FormGroup>
                            <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                                <input  type="password" 
                                        id="inputRepitaSenha" 
                                        name="senha" 
                                        className="form-control"
                                        onChange={e => this.setState({senhaRepeticao: e.target.value})} />
                            </FormGroup>

                            <button onClick={this.cadastrar} type="button" class="btn btn-success">Salvar</button>
                            <button onClick={this.prepareVoltar} type="button" class="btn btn-danger">Voltar</button>
                        </div>
                    </div>        
                </div>
            </Card>
        )
    }
}

export default withRouter (CadastroUsuario);