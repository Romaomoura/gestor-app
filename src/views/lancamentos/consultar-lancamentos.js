/* eslint-disable no-useless-constructor */
import React from 'react';
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/select-menu'
import LancamentosTable from './lancamentosTable'

import LancamentoService from '../../app/service/lancamentoService'
import LocalStorageService from '../../app/service/localStoreService'

import * as messages from '../../components/toastr'

class ConsultarLancamentos extends React.Component {

    state = {
        ano : '',
        mes : '',
        tipo : '',
        descricao: '',
        lancamentos: []
    }

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    buscar = () => {

        if(!this.state.ano){
            messages.mensagemErro('O preenchimento do campo Ano é obrigatório.')
            return false
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes, 
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service.consultar(lancamentoFiltro).then(response => {
            this.setState({lancamentos: response.data})
        }).catch(error => {
            console.log(error);
            messages.mensagemErro(error.response.data)
        })
    }

    editar = (id) => {
        console.log('Editando o lancamento ', id)
    }

    deletar = (lancamento) => {
        this.service.deletar(lancamento.id).then(response => {
            const lancamentos = this.state.lancamentos;
            const index = lancamentos.indexOf(lancamento);
            lancamentos.splice(index, 1);
            this.setState(lancamentos);
            messages.mensagemSucesso('Lançamento deletado com sucesso.')
        }).catch(error => {
            messages.mensagemErro('Ocorreu um erro ao tentar deletar o lancamento.')
        })
    }

   render() {

    const lista = this.service.obterListaMeses();

    const tipos = this.service.obterListaTipos();


       return (
           <Card title="Consultar Lancamentos">
               <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="imputAno" label="Ano: *">
                                <input type="text" className="form-control"
                                       id="imputAno" value={this.state.ano} onChange={e => this.setState({ano: e.target.value})}
                                       placeholder="Digite o ano"/>
                            </FormGroup>

                            <FormGroup htmlFor="imputMes" label="Mês: ">
                                <SelectMenu id="imputMes" className="form-control" 
                                            value={this.state.mes} onChange={e => this.setState({mes: e.target.value})}
                                            lista={lista} />
                            </FormGroup>

                            <FormGroup htmlFor="imputDescricao" label="Descrição: ">
                                <input type="text" className="form-control"
                                       id="imputDescricao" value={this.state.descricao} onChange={e => this.setState({descricao: e.target.value})}
                                       placeholder="Digite a descrição"/>
                            </FormGroup>

                            <FormGroup htmlFor="imputTipo" label="Tipo Lancamento: ">
                                <SelectMenu id="imputTipo" className="form-control" 
                                            value={this.state.tipo} onChange={e => this.setState({tipo: e.target.value})}
                                            lista={tipos} />
                            </FormGroup>
                            <button onClick={this.buscar} type="button" className="btn btn-success">Buscar</button>
                            <button onClick={''} type="button" className="btn btn-danger">Cadastrar</button>
                        </div>
                   </div>
               </div>
               <br/>
               <div className="row">
                   <div className="col-md-12">
                       <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos}
                                              deleteAction={this.deletar}
                                              editAction={this.editar} />
                       </div>
                   </div>
               </div>
           </Card>
       )
   }

}

export default withRouter(ConsultarLancamentos);