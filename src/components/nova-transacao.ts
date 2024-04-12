import Conta from "../types/Conta.js";
import { TipoTransacao } from "../types/TipoTransacao.js";
import { Transacao } from "../types/Transacao.js";
import ExtratoComponent from "./extrato.js";
import SaldoComponent from "./saldo.js";

const elementoForm = document.querySelector('.block-nova-transacao form') as HTMLFormElement;
elementoForm.addEventListener('submit', e => {
    try {
        e.preventDefault();

        if (!elementoForm.checkValidity()) {
            alert('Preencha todos os campos da transação!')
            return;
        }

        const inputTipoTransacao = elementoForm.querySelector('#tipoTransacao') as HTMLSelectElement;
        const inputValor = elementoForm.querySelector('#valor') as HTMLInputElement;
        const inputData = elementoForm.querySelector('#data') as HTMLInputElement;

        let tipoTransacao: TipoTransacao = inputTipoTransacao.value as TipoTransacao;
        let valor: number = Number(inputValor.value);
        let data: Date = new Date(inputData.value + " 00:00:00");

        const novaTransacao: Transacao = {
            tipoTransacao: tipoTransacao,
            valor: valor,
            data: data
        }

        Conta.registrarTransacao(novaTransacao);
        SaldoComponent.atualizar();  
        ExtratoComponent.atualizar();   
        elementoForm.reset();
    } 
    catch(erro) {
        alert(erro.message);
    }
});