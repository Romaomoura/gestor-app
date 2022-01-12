import React from 'react';

import AuthService from '../app/service/authService';

export const AuthContext =  React.createContext()
export const AuthConsumer =  AuthContext.Consumer;
const AuthProvider = AuthContext.Provider;

class ProvedorAutenticacao extends React.Component {

    state = {
        isUsuarioAutenticado: null,
        isAutenticado: false
    }

    iniciarSessao = (usuario) => {
        AuthService.logar(usuario);
        this.setState({isAutenticado: true, isUsuarioAutenticado: usuario});
    }

    encerrarSessao = () => {
        AuthService.removerUsuarioAutenticado();
        this.setState({isAutenticado: false, isUsuarioAutenticado: null});
    }

    render() {
        
        const contexto = {
            isAutenticado: this.state.isAutenticado,
            isUsuarioAutenticado: this.state.isUsuarioAutenticado,
            iniciarSessao: this.iniciarSessao,
            encerrarSessao: this.encerrarSessao
        } 


        return (
            <AuthProvider value={contexto}>
                {this.props.children}
            </AuthProvider>
        )
    }
}

export default ProvedorAutenticacao;