import Conta from "../types/Conta.js";
import ExtratoComponent from "./extrato.js";
import SaldoComponent from "./saldo.js";
const elementoForm = document.querySelector('.block-nova-transacao form');
elementoForm.addEventListener('submit', e => {
    try {
        e.preventDefault();
        if (!elementoForm.checkValidity()) {
            alert('Preencha todos os campos da transação!');
            return;
        }
        const inputTipoTransacao = elementoForm.querySelector('#tipoTransacao');
        const inputValor = elementoForm.querySelector('#valor');
        const inputData = elementoForm.querySelector('#data');
        let tipoTransacao = inputTipoTransacao.value;
        let valor = Number(inputValor.value);
        let data = new Date(inputData.value + " 00:00:00");
        const novaTransacao = {
            tipoTransacao: tipoTransacao,
            valor: valor,
            data: data
        };
        Conta.registrarTransacao(novaTransacao);
        SaldoComponent.atualizar();
        ExtratoComponent.atualizar();
        elementoForm.reset();
    }
    catch (erro) {
        alert(erro.message);
    }
});
