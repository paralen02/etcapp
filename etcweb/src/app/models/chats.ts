import { Compradores } from "./compradores";
import { Compras } from "./compras";
import { Vendedores } from "./vendedores";

export class Chats {
    idChats: number = 0;
    estado: boolean = false;
    compra: Compras | null = null;
    comprador: Compradores = new Compradores();
    vendedor: Vendedores = new Vendedores();
}
