import React from 'react';

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/select-menu'
import { withRouter} from 'react-router-dom';

import lancamentoService from '../../app/service/lancamentoService'

import LocalStorageService from '../../app/service/localStoreService'

import * as messages from '../../components/toastr'


class CadastrarLancamentos extends React.Component {

    state = {

        id: null,
        descricao: '',
        mes: '',
        ano: '',
        valor: '',
        tipo: '',
        status: '',
        usuario: null

    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name] : value});
    }

    constructor() {
        super();
        this.service = new lancamentoService();
    }

    componentDidMount() {
        const params = this.props.match.params;

        if (params.id){
            this.service.obterPorId(params.id)
                        .then(response => {
                            this.setState( {...response.data} )
                        }).catch(error => {
                            messages.mensagemErro(error.response.data)
                        });
        }
        
    }

    submit = () => {

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        const { descricao, valor, mes, ano, tipo } = this.state;

        const lancamento = { descricao, valor,mes,ano,tipo, usuario: usuarioLogado.id  }

        this.service.salvar(lancamento)
                    .then( response => {
                        messages.mensagemSucesso('Lançamento cadastrado com sucesso.');
                        this.props.history.push('/consultar-lancamentos')
                    }).catch( error => {
                        messages.mensagemErro(error.response.data); 
                    });
    }

    atualizar = () => {

        const { descricao, valor, mes, ano, tipo, status, id, usuario } = this.state;

        const lancamento = { descricao, valor,mes,ano,tipo, status, id, usuario  };

        this.service.atualizar(lancamento)
                    .then( response => {
                        messages.mensagemSucesso('Lançamento atualizado com sucesso.');
                        this.props.history.push('/consultar-lancamentos')
                    }).catch( error => {
                        messages.mensagemErro(error.response.data); 
                    });
    }

    cancelarCadastro = () => {
        this.props.history.push('/consultar-lancamentos')
    }

    render() {

        const tipos = this.service.obterListaTipos();
        const meses = this.service.obterListaMeses();

        return(
            <Card title="Cadastro de lancamento">
                <div className="row">
                    <div className="col-md-10">
                        <FormGroup id="InputDescricao" label="Descrição: *">
                            <input id="InputDescricao" type="text" className="form-control" 
                                   name="descricao" value={this.state.descricao} onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-2">
                        <FormGroup id="inputMes" label="Mês: *">
                            <SelectMenu id="inputMes" lista={meses} className="form-control" 
                            name="mes" value={this.state.mes} onChange={this.handleChange}/>
                        </FormGroup>  
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <FormGroup id="inputAno" label="Ano: *">
                            <input id="inputAno" type="text" className="form-control" 
                            name="ano" value={this.state.ano} onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="InputValor" label="Valor: *">
                            <input id="InputValor" type="text" className="form-control" 
                            name="valor" value={this.state.valor} onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-3">
                        <FormGroup id="InputTipo" label="Tipo: *">
                            <SelectMenu id="InputTipo" lista={tipos} className="form-control"
                            name="tipo" value={this.state.tipo} onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-3">
                        <FormGroup id="InputStatus" label="Status: ">
                            <input type="text" className="form-control" disabled 
                            name="status" value={this.state.status} />
                        </FormGroup>
                    </div>
                </div>
                <button onClick={this.submit} type="button" className="btn btn-success">Salvar</button>
                <button onClick={this.atualizar} type="button" className="btn btn-outline-success">Atualizar</button>
                <button onClick={this.cancelarCadastro} type="button" className="btn btn-danger">Cancelar</button>
            </Card>
            
        )
    }
}

export default withRouter(CadastrarLancamentos)