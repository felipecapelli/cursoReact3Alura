import React, { Component } from 'react';
import { TextField, Grid, Button, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert'

import FormValidator from '../../utils/FormValidator';
import PopUp from '../../utils/PopUp';
import Tost from '../Tost/Tost';

class Formulario extends Component {

    constructor(props) {
        super(props);

        this.validador = new FormValidator([
            {
                campo: 'nome',
                metodo: 'isEmpty',
                validoQuando: false,
                mensagem: 'Entre com um nome'
            },
            {
                campo: 'livro',
                metodo: 'isEmpty',
                validoQuando: false,
                mensagem: 'Entre com um livro'
            },
            {
                campo: 'preco',
                metodo: 'isEmpty',
                validoQuando: false,
                mensagem: 'Entre com um preço'
            },
            {
                campo: 'preco',
                metodo: 'isInt',
                args: [{min: 5, max: 99}],
                validoQuando: true,
                mensagem: 'Entre com um valor numérico maior ou igual a 5 e menor ou igual a 99'
            }
        ])

        this.stateInicial = {
            nome: '',
            livro: '',
            preco: '',
            validacao: this.validador.valido(),
            mensagem: {
                open: true,
                texto: '',
                tipo: 'success'
            }
        }

        this.state = this.stateInicial;

    }

    escutadorDeInput = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    submitFormulario = () => {
        const validacao = this.validador.valida(this.state);

        if(validacao.isValid){
            this.props.escutadorDeSubmit(this.state);
            this.setState(this.stateInicial);
        }else{
            const { nome, livro, preco } = validacao;
            const campos = [nome, livro, preco];
            const camposInvalidos = campos.filter(elem => {
                return elem.isInvalid;
            });
            const erros = camposInvalidos.reduce((texto, campo) => texto + campo.mensagem + '. ', '');
            this.setState({
                mensagem :{
                    open: true,
                    texto: erros,
                    tipo: 'error'
                }
            })
        }
        
    }

    render() {

        const { nome, livro, preco } = this.state;

        return (
            <>
                <Tost 
                    open={this.state.mensagem.open}
                    handleClose={() => this.setState({
                        mensagem: {
                            open: false
                        }
                    })}
                    severity={this.state.mensagem.tipo}
                >
                    {this.state.mensagem.texto}
                </Tost>
                <form>
                    <Grid container spacing={2} alignItems='center'>
                        <Grid item>
                            <TextField 
                                id='nome' 
                                label='Nome' 
                                variant='outlined' 
                                name='nome'
                                value={nome} 
                                onChange={this.escutadorDeInput}
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                id='livro' 
                                label='Livro' 
                                variant='outlined' 
                                name='livro'
                                value={livro} 
                                onChange={this.escutadorDeInput}
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                id='preco' 
                                label='Preço' 
                                variant='outlined' 
                                name='preco'
                                value={preco} 
                                onChange={this.escutadorDeInput}
                            />
                        </Grid>
                        <Grid item>
                            <Button 
                                variant='contained' 
                                color='primary' 
                                color='primary' 
                                onClick={this.submitFormulario}>
                                    Salvar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </>
        );
    }
}
export default Formulario;