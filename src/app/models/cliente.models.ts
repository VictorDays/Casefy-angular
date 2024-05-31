import { Endereco } from "./endereco.models";
import { Telefone } from "./telefone.models";

export class Cliente {
    id!: number;
    nome!: string;
    login!: string;
    senha!: string;
    cpf!: string;
    dataNascimento!: string;
    listaTelefones: Telefone[] = [];
    listaEnderecos: Endereco[] = [];
}