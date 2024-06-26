import Conta from "../types/Conta.js";
import { FormatoData } from "../types/FormatoData.js";
import { formatarData } from "../utils/formatarData.js";

const elementoDataAcesso = document.querySelector('.block-saldo time') as HTMLElement;

const renderizarData = (): void => {
    if (elementoDataAcesso != null) {
        elementoDataAcesso.textContent = formatarData(Conta.getDataAcesso(), FormatoData.DIA_SEMANA_DIA_MES_ANO);
    }
}

const DataComponent = {
    atualizar(){
        renderizarData()
    }
}

DataComponent.atualizar();
export default DataComponent;