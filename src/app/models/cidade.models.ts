import { Estado } from "./estado.models";

export class Cidade {
    id!: number;
    nome!: string;
    estado!: Estado;
}