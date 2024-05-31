import { Cidade } from "./cidade.models";

export class Endereco {
    id!: number;
    logradouro!: string;
    numero!: string;
    complemento!: string;
    bairro!: string;
    cep!: string;
    cidade!: Cidade
}