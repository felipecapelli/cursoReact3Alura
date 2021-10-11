import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button'

const CellDeleta = ({ removeDados, id }) => {
    if (!removeDados) {
        return null
    }
    return(
        <TableCell>
            <Button
                variant="contained"
                color="primary"
                onClick = { () => { 
                    removeDados(id)
                }}
            >
                Remover
            </Button>
        </TableCell>
    )
        
};

const TituloDeleta = ({ removeDados }) => {
    if (!removeDados) {
        return null;
    }

    return <TableCell>Remover</TableCell>
}

const Tabela = props => {

    //uma das maneiras de exibir o título da coluna no tablehead - mas não está sendo usada esse projeto, apenas para exemplificar
    /*const TituloDeleta = ({ removeDados }) => (
        removeDados ?
        <TableCell>Deleta</TableCell>
        :
        ''
    );*/

    const { campos, dados, removeDados } = props;

    return (
        <Table className="centered highlight">
            <TableHead>
                <TableRow>
                    {
                        campos.map((campo) => (
                            <TableCell>{campo.titulo}</TableCell>
                        ))
                    }
                    <TituloDeleta removeDados = { removeDados } ></TituloDeleta>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    dados.map(dado => (
                        <TableRow key={dado.id}>
                            {
                                campos.map(campo => (
                                    <TableCell>{dado[campo.dado]}</TableCell>
                                ))
                            }
                            <CellDeleta id={dado.id} removeDados={removeDados}></CellDeleta>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
}

export default Tabela;