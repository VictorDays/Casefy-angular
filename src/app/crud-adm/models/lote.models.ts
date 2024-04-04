import { Fornecedor } from "./fornecedor.models";

export class Lote {
    id!: number;
    codigo!: string;
    quantidadeItens!: number;
    estoque!: number;
    valorUnitario!: number;
    valorTotal!: number;
    dataCompra!: number;
    fornecedor!: Fornecedor;
}
