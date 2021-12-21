import React from 'react';

import Card from '../components/card'
import FormGroup from '../components/form-group';
import { withRouter } from 'react-router-dom';
import UsuarioService from '../app/service/usuarioService'
  
import { mensagemSucesso, mensagemErro } from '../components/toastr';

class CadastroUsuario extends React.Component {

    state = {
        nome : '',
        email: '',
        senha: '',
        senhaRepeticao : ''
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    validarCampos(){
        const msgs =[]

        if (!this.state.nome) {
            msgs.push("O campo nome é obrigatório.")
        }

        if (!this.state.email) {
            msgs.push("O campo email é obrigatório")
        }else if( !this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            msgs.push("Informe um email válido.")
        }

        if (!this.state.senha || !this.state.senhaRepeticao) {
            msgs.push("Digite a senha nos campos solicitados.")
        }else if(this.state.senha !== this.state.senhaRepeticao){
            msgs.push("As senhas digitadas são diferentes.")
        }

        return msgs;

    }

    cadastrar = () => {
        const msgs = this.validarCampos()

        if (msgs && msgs.length > 0) {
            msgs.forEach((msg, index) => {
                mensagemErro(msg)
            })
            return false
        }

        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        }

        this.service.salvar(usuario)
                .then(response => {
                    mensagemSucesso('Usuário cadastrado com sucesso! Faça login para acessar o sistema.')
                    this.props.history.push('/login')
                }).catch(error => {
                    mensagemErro(error.response.data)
                })
    }

    prepareVoltar = () => {
        this.props.history.push('/login')
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