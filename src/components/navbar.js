import React from 'react';

import NavbarItem from './navbaritem'

import { AuthConsumer} from '../main/provedorAutenticacao'

function Navbar(props) {
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary" >
        <div className="container">
          <a href="/home" class="navbar-brand">Gestor Financeiro</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" 
                  data-target="#navbarResponsive" aria-controls="navbarResponsive" 
                  aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav">
             <NavbarItem render={props.isUsuarioAutenticado} href="/home" label="Home" />
             <NavbarItem render={props.isUsuarioAutenticado} href="/cadastro-usuario" label="Usuários" />
             <NavbarItem render={props.isUsuarioAutenticado} href="/consultar-lancamentos" label="Lancamentos" />
             <NavbarItem render={props.isUsuarioAutenticado} onClick={props.deslogar} href="/login" label="Sair" />
          </ul>
          </div>
        </div>
      </div>
    )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <AuthConsumer>
      { (context) => (
        <Navbar isUsuarioAutenticado={context.isAutenticado} deslogar={context.encerrarSessao} />
      ) }
  </AuthConsumer>
)
