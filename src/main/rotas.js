/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuario';
import Home from '../views/home';
import ConsultarLancamentos from '../views/lancamentos/consultar-lancamentos'
import CadastrarLancamentos from '../views/lancamentos/cadastro-lancamentos'
import { AuthConsumer} from '../main/provedor-autenticacao'

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom';

function RotaAutenticada( { component: Component, isUsuarioAutenticado, ...props } ){
    return(
        <Route {...props} render={ (componentProps) => { 
            if(isUsuarioAutenticado){
                return ( <Component {...componentProps} /> )
            }else{
                return ( <Redirect to={{pathname : '/login', state: { from: componentProps.location }}}/>)
            }
        }}/>
    )
}

function Rotas(props) {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuario" component={CadastroUsuario} />
                
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home}/>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consultar-lancamentos" component={ConsultarLancamentos} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastrar-lancamentos/:id?" component={CadastrarLancamentos} />
            </Switch>
        </HashRouter>
    )
}

export default () => (
    <AuthConsumer>
        { (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado} />) }
    </AuthConsumer>
)