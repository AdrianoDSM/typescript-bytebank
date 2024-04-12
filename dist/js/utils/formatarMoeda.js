export const formatarMoeda = (valor) => {
    return valor.toLocaleString('pt-br', { currency: 'BRL', style: 'currency' });
};
