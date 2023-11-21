import { Compradores } from "./compradores";
import { Envios } from "./envios";
import { Operaciones } from "./operaciones";
import { Publicaciones } from "./publicaciones";


export class Compras {
    idCompras: number = 0;
    fecha: Date = new Date();
    operacion: Operaciones = new Operaciones();
    publicacion: Publicaciones = new Publicaciones();
    comprador: Compradores = new Compradores();
    envio: Envios = new Envios();
}
