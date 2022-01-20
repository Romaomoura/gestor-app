import React from 'react';

import UsuarioService from '../app/service/usuarioService'
import { AuthContext } from '../main/provedorAutenticacao'

class Home extends React.Component {

    state = {
        receita: 0,
        despesa : 0,
        saldo: 0
    }

    constructor(){
        super();
        this.usuarioService = new UsuarioService();
    }

    componentDidMount() {
        const usuarioLogado = this.context.usuarioAutenticado;

        this.usuarioService
                .obterSaldoReceitaPorUsuario(usuarioLogado.id)
                .then(response => {
                    console.log('IdUSuarioReceitaHome>>> ',usuarioLogado.id)
                    this.setState({receita: response.data})
                }).catch(error => {
                    console.log(error.response.data)
        });
    
        this.usuarioService
                .obterSaldoDespesaPorUsuario(usuarioLogado.id)
                .then(response => {
                    this.setState({despesa: response.data})
                }).catch(error => {
                 console.log(error.response.data)
        });
        
        this.usuarioService
                .obterSaldoPorUsuario(usuarioLogado.id)
                .then(response => {
                    this.setState({saldo: response.data})
                }).catch(error => {
                    console.log(error.response.data)
                });
    }

    render(){
        return (
            <div className="jumbotron">
                <h1 className="display-4">Bem vindo!</h1>
                <p className="lead">Ao seu Gestor financeiro.</p>
                <p className="lead">Suas Receitas para o mês atual é de R$ {this.state.receita}.</p>
                <p className="lead">Suas despesas para o mês atual é de R$ {this.state.despesa}</p>
                <p className="lead">Seu saldo para o mês atual considerando receitas e despesas é de R$ {this.state.saldo}</p>
                <hr className="my-4"/>
                <p> Utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                <a className="btn btn-primary btn-lg" href="/cadastro-usuario" 
                    role="button"><i className="pi pi-user-plus"></i>  Cadastrar Usuário</a>
                <a className="btn btn-danger btn-lg" 
                    href="/cadastrar-lancamentos"
                    role="button"><i className="pi pi-plus"></i> Cadastrar Lançamento</a>
                </p>
            </div>
        )
    }
}

Home.contextType = AuthContext;

export default Home;