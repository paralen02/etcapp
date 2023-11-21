import { Caracteristicas } from "./caracteristicas";
import { Categorias } from "./categorias";
import { Vendedores } from "./vendedores";

export class Productos {
    idProductos: number = 0;
    precio: number = 0;
    imagen: string = "";
    stock: number = 0;
    categoria: Categorias = new Categorias();
    vendedor: Vendedores = new Vendedores();
    caracteristica: Caracteristicas = new Caracteristicas();
}
