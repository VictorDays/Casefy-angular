import { Fornecedor } from "./fornecedor.models";

export class Lote {
    id!: number;
    quantidadeItens!: number;
    valorUnitario!: number;
    valorTotal!: number;
    dataCompra!: number;
    fornecedor!: Fornecedor;
}
