import React from 'react';

import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuario';
import Home from '../views/home';
import ConsultarLancamentos from '../views/lancamentos/consultar-lancamentos'
import CadastrarLancamentos from '../views/lancamentos/cadastro-lancamentos'

import { Route, Switch, HashRouter } from 'react-router-dom';

function Rotas() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuario" component={CadastroUsuario} />
                <Route path="/consultar-lancamentos" component={ConsultarLancamentos} />
                <Route path="/cadastrar-lancamentos/:id?" component={CadastrarLancamentos} />
            </Switch>
        </HashRouter>
    )
}

export default Rotas;