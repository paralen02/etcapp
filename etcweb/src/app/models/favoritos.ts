import { Compradores } from "./compradores";
import { Publicaciones } from "./publicaciones";

export class Favoritos {
  idFavoritos: number = 0;
  comprador: Compradores = new Compradores();
  publicacion: Publicaciones = new Publicaciones();
}
