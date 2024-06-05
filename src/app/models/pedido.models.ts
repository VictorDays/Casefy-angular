import { Endereco } from "./endereco.models";
import { Cliente } from "./cliente.models";
import { ItemVenda } from "./ItemVenda.models";

export class Pedido {
    id!: number;
    endereco!: Endereco;
    cliente!: Cliente;
    valortotal!: number;
    itemVenda: ItemVenda[] = [];
}