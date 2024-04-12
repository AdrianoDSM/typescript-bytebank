export const formatarMoeda = (valor:number):string => {
    return valor.toLocaleString('pt-br', {currency:'BRL', style: 'currency'})
}