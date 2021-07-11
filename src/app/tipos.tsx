//import { StringLiteralType } from 'typescript';

export interface IDespesa {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  mes: string;
  dia: string;
}

export interface IUser {
  name: string;
  email: string;
}
