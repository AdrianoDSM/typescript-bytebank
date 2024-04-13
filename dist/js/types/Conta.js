var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Armazenador } from "./Armazenador.js";
import { ValidaDebito, ValidaDeposito } from "./Decorators.js";
import { TipoTransacao } from "./TipoTransacao.js";
export class Conta {
    nome;
    saldo = Armazenador.obter('saldo') || 0;
    transacoes = Armazenador.obter(('transacoes'), (key, value) => {
        if (key === 'data') {
            return new Date(value);
        }
        return value;
    }) || [];
    constructor(nome) {
        this.nome = nome;
    }
    getTitular() {
        return this.nome;
    }
    getGruposTransacoes() {
        const gruposTransacoes = [];
        const listaTransacoes = structuredClone(this.transacoes);
        const transacoesOrdenadas = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());
        let labelAtualGrupoTransacao = '';
        for (let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao = transacao.data.toLocaleDateString('pt-br', { month: 'long', year: 'numeric' });
            if (labelAtualGrupoTransacao !== labelGrupoTransacao) {
                labelAtualGrupoTransacao = labelGrupoTransacao;
                gruposTransacoes.push({
                    label: labelGrupoTransacao,
                    transacoes: []
                });
            }
            gruposTransacoes.at(-1).transacoes.push(transacao);
        }
        return gruposTransacoes;
    }
    getSaldo() {
        return this.saldo;
    }
    getDataAcesso() {
        return new Date();
    }
    depositar(valor) {
        this.saldo += valor;
        Armazenador.salvar('saldo', this.saldo.toString());
    }
    debitar(valor) {
        this.saldo -= valor;
        Armazenador.salvar('saldo', this.saldo.toString());
    }
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            this.depositar(novaTransacao.valor);
        }
        else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            this.debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;
        }
        else {
            throw new Error('Tipo de Transação Inválida!');
        }
        this.transacoes.push(novaTransacao);
        console.log(this.getGruposTransacoes());
        Armazenador.salvar('transacoes', JSON.stringify(this.transacoes));
    }
    agruparTransacoes() {
        const resumo = {
            totalDepositos: 0,
            totalTransferencias: 0,
            totalPagamentosBoleto: 0
        };
        this.transacoes.forEach((transacao) => {
            switch (transacao.tipoTransacao) {
                case TipoTransacao.DEPOSITO:
                    resumo.totalDepositos += transacao.valor;
                    break;
                case TipoTransacao.TRANSFERENCIA:
                    resumo.totalTransferencias += transacao.valor;
                    break;
                case TipoTransacao.PAGAMENTO_BOLETO:
                    resumo.totalPagamentosBoleto += transacao.valor;
                    break;
            }
        });
        return resumo;
    }
}
__decorate([
    ValidaDeposito
], Conta.prototype, "depositar", null);
__decorate([
    ValidaDebito
], Conta.prototype, "debitar", null);
export class ContaPremium extends Conta {
    registrarTransacao(transacao) {
        if (transacao.tipoTransacao === TipoTransacao.DEPOSITO) {
            console.log('ganhou um bônus de 0.50 centavos');
            transacao.valor += 0.5;
        }
        super.registrarTransacao(transacao);
    }
}
const conta = new Conta('Joana da Silva Oliveira');
const contaPremium = new ContaPremium('Adriano Dias');
export default conta;
