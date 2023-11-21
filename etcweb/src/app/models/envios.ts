import { Repartidores } from "./repartidores";

export class Envios {
  idEnvios: number = 0;
  entregado: boolean = false;
  fecha: Date = new Date();
  repartidor: Repartidores = new Repartidores();
}
