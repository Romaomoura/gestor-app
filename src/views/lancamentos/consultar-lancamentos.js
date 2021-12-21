import React from 'react';
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/select-menu'
import LancamentosTable from './lancamentosTable'

class ConsultarLancamentos extends React.Component {
   render() {

    const lista = [
        {label: 'Selecione...', value: ''},
        {label: 'Janeiro', value: 1},
        {label: 'Fevereiro', value: 2},
        {label: 'Março', value: 3},
        {label: 'Abril', value: 4},
        {label: 'Maio', value: 5},
        {label: 'Junho', value: 6},
        {label: 'Julho', value: 7},
        {label: 'Agosto', value: 8},
        {label: 'Setembro', value: 9},
        {label: 'Outubro', value: 10},
        {label: 'Novembro', value: 11},
        {label: 'Dezembro', value: 12},
    ];

    const tipos = [
        {label: 'Selecione...', value: ''},
        {label: 'Receita', value: 'RECEITA'},
        {label: 'Despesa', value: 'DESPESA'}
    ];

    const lancamentos = [
        {id : 1, descricao : 'Salário', valor : 200.20, mes: 1, tipo: 'Receita', status : 'Pendente'}
    ]

       return (
           <Card title="Consultar Lancamentos">
               <div className="row">
                    <div className="col-md-3">
                        <div className="bs-component">
                            <FormGroup htmlFor="imputAno" label="Ano: *">
                                <input type="text" className="form-control"
                                       id="imputAno" aria-describedby=""
                                       placeholder="Digite o ano"/>
                            </FormGroup>

                            <FormGroup htmlFor="imputMes" label="Mês: ">
                                <SelectMenu id="imputMes" className="form-control" lista={lista} />
                            </FormGroup>

                            <FormGroup htmlFor="imputTipo" label="Tipo Lancamento: ">
                                <SelectMenu id="imputTipo" className="form-control" lista={tipos} />
                            </FormGroup>
                            <button onClick={''} type="button" className="btn btn-success">Buscar</button>
                            <button onClick={''} type="button" className="btn btn-danger">Cadastrar</button>
                        </div>
                   </div>
               </div>
               <br/>
               <div className="row">
                   <div className="col-md-12">
                       <div className="bs-component">
                            <LancamentosTable lancamentos={lancamentos} />
                       </div>
                   </div>
               </div>
           </Card>
       )
   }

}

export default withRouter(ConsultarLancamentos);