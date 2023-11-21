import { Productos } from "./productos";

export class Publicaciones {
  idPublicaciones: number = 0;
  titulo: string = "";
  descripcion: string = "";
  fecha: Date = new Date();
  producto: Productos = new Productos();
}
