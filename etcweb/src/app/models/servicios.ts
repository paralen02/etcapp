import { Operaciones } from "./operaciones";
import { Vendedores } from "./vendedores";

export class Servicios{
  idServicios: number = 0;
  direccion: string = "";
  fecha: Date = new Date();
  operacion: Operaciones = new Operaciones();
  vendedor: Vendedores = new Vendedores();
}
