import {ClienteTelefone} from "./ClienteTelefone";

export class Cliente {
  id ?: number;
  nome ?: string;
  endereco ?: string;
  bairro ?: string;
  telefones ?: ClienteTelefone[];
}
