import React from 'react';

import Login from '../views/login'
import Home from '../views/home';
import CadastroUsuario from '../views/cadastroUsuario';
import ConsultarLancamentos from '../views/lancamentos/consultar-lancamentos'
import CadastrarLancamentos from '../views/lancamentos/cadastro-lancamentos'
import LandingPage from '../views/landingPage'
import { AuthConsumer} from '../main/provedorAutenticacao'

import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

function RotaAutenticada( { component: Component, isUsuarioAutenticado, ...props } ){
    return(
        <Route exact {...props} render={ (componentProps) => { 
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
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={LandingPage}/>
                <Route exact path="/login" component={Login} />
                <Route exact path="/cadastro-usuario" component={CadastroUsuario} />
                
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home}/>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consultar-lancamentos" component={ConsultarLancamentos} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastrar-lancamentos/:id?" component={CadastrarLancamentos} />
            </Switch>
        </BrowserRouter>
    )
}

export default () => (
    <AuthConsumer>
        { (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado} />) }
    </AuthConsumer>
)