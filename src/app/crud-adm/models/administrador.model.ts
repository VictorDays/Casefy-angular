export class NivelAcesso {
    id!: number;
    label!: string;
}
export class Administrador {
    id!: number;
    nome!: string;
    matricula!: number;
    cpf!: string;
    email!: string;
    senha!: string;
    perfil!: string;
    idNivelAcesso!: NivelAcesso;
}