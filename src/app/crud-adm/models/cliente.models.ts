import { Telefone } from "./telefone.models";

export class Cliente {
    id!: number;
    nome!: string;
    email!: string;
    senha!: string;
    cpf!: string;
    dataNascimento!: string;
    telefones!: Telefone[]
}