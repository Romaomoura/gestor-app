/* eslint-disable no-useless-constructor */
import React from 'react';
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/select-menu'
import LancamentosTable from './lancamentosTable'

import LancamentoService from '../../app/service/lancamentoService'
import LocalStorageService from '../../app/service/localStoreService'

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import * as messages from '../../components/toastr'

class ConsultarLancamentos extends React.Component {

    state = {
        ano : '',
        mes : '',
        tipo : '',
        descricao: '',
        showConfirmDialog: false,
        lancamentoADeletar: {},
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
        this.props.history.push(`/cadastrar-lancamentos/${id}`)
    }

    abrirConfirmacao = (lancamento) => {
        this.setState({showConfirmDialog: true, lancamentoADeletar: lancamento})
    }

    cancelarConfirmacao = (lancamento) => {
        this.setState({showConfirmDialog: false, lancamentoADeletar: {}})
    }

    deletar = () => {
        this.service
        .deletar(this.state.lancamentoADeletar.id)
        .then(response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(this.state.lancamentoADeletar);
                lancamentos.splice(index, 1);
                this.setState({lancamentos: lancamentos, showConfirmDialog: false});
                messages.mensagemSucesso('Lançamento deletado com sucesso.')
        }).catch(error => {
            messages.mensagemErro('Ocorreu um erro ao tentar deletar o lancamento.')
        })
    }

    prepareCadastrar = () => {
        this.props.history.push('/cadastrar-lancamentos')
    }

    alterarStatus = (lancamento, status) => {
        this.service.alterarStatus(lancamento.id, status)
                    .then( response => {
                        const lancamentos = this.state.lancamentos;
                        const index = lancamentos.indexOf(lancamento);
                        if (index !== -1) {
                            lancamento['status'] = status;
                            lancamentos[index] = lancamento;
                            this.setState({lancamento});
                        }
                        messages.mensagemSucesso('Status do lancamento modificado com sucesso!')
                    })
    }

   render() {

    const lista = this.service.obterListaMeses();

    const tipos = this.service.obterListaTipos();

    const confirmDialogFooter = (
        <div>
            <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} />
            <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarConfirmacao} className="p-button-secondary"/>
        </div>
    );


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
                            <button onClick={this.buscar} type="button" className="btn btn-success"><i className="pi pi-search"></i> Buscar</button>
                            <button onClick={this.prepareCadastrar} type="button" className="btn btn-primary"><i className="pi pi-plus"></i> Novo Lançamento</button>
                        </div>
                   </div>
               </div>
               <br/>
               <div className="row">
                   <div className="col-md-12">
                       <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos}
                                              deleteAction={this.abrirConfirmacao}
                                              editAction={this.editar}
                                              alterarStatus={this.alterarStatus} />
                       </div>
                   </div>
               </div>
               <div>
               <Dialog header="Atenção" 
                        visible={this.state.showConfirmDialog} 
                        style={{ width: '50vw' }} 
                        modal={true}
                        footer={confirmDialogFooter}
                        onHide={() => this.setState({showConfirmDialog: false})}>
                    <p>Deseja realmente deletar o lancamento?</p>
                </Dialog>

               </div>
           </Card>
       )
   }

}

export default withRouter(ConsultarLancamentos);