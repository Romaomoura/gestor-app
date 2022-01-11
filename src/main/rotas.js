import React from 'react';

import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuario';
import Home from '../views/home';
import ConsultarLancamentos from '../views/lancamentos/consultar-lancamentos'
import CadastrarLancamentos from '../views/lancamentos/cadastro-lancamentos'

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom';

const isUsuarioAutenticado = () => { 
    return true; 
};

function RotaAutenticada( { component: Component, ...props } ){
    return(
        <Route {...props} render={ (componentProps) => { 
            if(isUsuarioAutenticado()){
                return ( <Component {...componentProps} /> )
            }else{
                return ( <Redirect to={{pathname : '/login', state: { from: componentProps.location }}}/>)
            }
        }}/>
    )
}

function Rotas() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuario" component={CadastroUsuario} />
                
                <RotaAutenticada path="/home" component={Home}/>
                <RotaAutenticada path="/consultar-lancamentos" component={ConsultarLancamentos} />
                <RotaAutenticada path="/cadastrar-lancamentos/:id?" component={CadastrarLancamentos} />
            </Switch>
        </HashRouter>
    )
}

export default Rotas;