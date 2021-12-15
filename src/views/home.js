import React from 'react';

import UsuarioService from '../app/service/usuarioService';
import LocalStorageService from '../app/service/localStoreService';

class Home extends React.Component {

    state = {
        saldo: 0
    }

    constructor(){
        super();
        this.usuarioService = new UsuarioService();
    }

    componentDidMount() {

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
        
        this.usuarioService
                .obterSaldoPorUsuario(usuarioLogado.id)
                .then(response => {
                    this.setState({saldo: response.data})
                }).catch(error => {
                    console.log(error.response.data)
                });
    }

    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-4">Bem vindo!</h1>
                <p className="lead">Ao seu Gestor financeiro.</p>
                <p className="lead">Seu saldo para o mês atual é de R$ {this.state.saldo}</p>
                <hr className="my-4"/>
                <p> Utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                <a className="btn btn-primary btn-lg" href="#/cadastro-usuario" 
                    role="button"><i 
                    className="fa fa-users"></i>  Cadastrar Usuário</a>
                <a className="btn btn-danger btn-lg" 
                    href="#/" 
                    role="button"><i 
                    className="fa fa-users"></i>  Cadastrar Lançamento</a>
                </p>
            </div>
        )
    }
}

export default Home;