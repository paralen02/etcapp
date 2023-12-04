import { Repartidores } from "./repartidores";

export class Envios {
  idEnvios: number = 0;
  entregado: boolean = false;
  fecha_envio: Date = new Date();
  fecha_compra: Date = new Date();
  fecha_despacho: Date = new Date();
  fecha_entrega: Date = new Date();
  repartidor: Repartidores | null = null;
  departamento: string = "";
  provincia: string = "";
  distrito: string = "";
  direccion: string = "";
  referencia: string = "";
}
