import { Compras } from "./compras";

export class Resenias {
  idResenias: number = 0;
  comentario: string = "";
  calificacion: number = 0;
  fecha: Date = new Date();
  compra: Compras = new Compras();
}
