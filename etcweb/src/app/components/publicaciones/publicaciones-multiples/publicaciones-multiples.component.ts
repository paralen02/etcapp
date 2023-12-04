import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Caracteristicas } from './../../../models/caracteristicas';
import { Vendedores } from './../../../models/vendedores';
import { Productos } from './../../../models/productos';
import { Publicaciones } from './../../../models/publicaciones';
import { CaracteristicasService } from './../../../services/caracteristicas.service';
import { VendedoresService } from './../../../services/vendedores.service';
import { ProductosService } from './../../../services/productos.service';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { Resenias } from 'src/app/models/resenias';
import { ReseniasService } from 'src/app/services/resenias.service';
import { ComprasService } from 'src/app/services/compras.service';
import { Compras } from 'src/app/models/compras';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-publicaciones-multiples',
  templateUrl: './publicaciones-multiples.component.html',
  styleUrls: ['./publicaciones-multiples.component.css']
})
export class PublicacionesMultiplesComponent implements OnInit {
  idPublicaciones!: string;
  mensaje: string=""
  resenias: Resenias[]=[];
  publicaciones: Publicaciones[] = [];
  productos: Productos[] = [];
  vendedores: Vendedores[] = [];
  compras: Compras[]=[];
  otrasPublicaciones: Publicaciones[]=[];
  caracteristicas: Caracteristicas[] = [];
  combinedPublicacion: {
    titulo: string,
    precio: number,
    titulos: string[],
    color: string,
    material: string,
    tiempoUso: string,
    idPublicaciones: number[] // Agrega esta línea
  } = {
    titulo: '',
    precio: 0,
    titulos: [],
    color: '',
    material: '',
    tiempoUso: '',
    idPublicaciones: [] // Agrega esta línea
  };

  constructor(
    private route: ActivatedRoute,
    private publicacionesService: PublicacionesService,
    private productosService: ProductosService,
    private vendedoresService: VendedoresService,
    private caracteristicasService: CaracteristicasService,
    private reseniasService: ReseniasService,
    private comprasService: ComprasService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const ids = this.route.snapshot.params['ids'].split('&').map((id: string) => parseInt(id));
    this.loadMultiplePublications(ids);
    this.obtenerOtrasPublicaciones(4);
  }

  loadMultiplePublications(ids: number[]): void {
    const idsAsString = ids.map(id => id.toString());
    let lastMaterial = '';
    this.publicacionesService.getMultiple(ids).subscribe((publicaciones: Publicaciones[]) => {
      this.publicaciones = publicaciones;
      this.resenias = [];
      this.compras = [];
      publicaciones.forEach((publicacion, index) => {
        this.productosService.listId(publicacion.producto.idProductos).subscribe((producto: Productos) => {
          this.productos[index] = producto;
          this.vendedoresService.listId(producto.vendedor.idVendedores).subscribe((vendedor: Vendedores) => {
            this.vendedores[index] = vendedor;
            this.caracteristicasService.listId(producto.caracteristica.idCaracteristicas).subscribe((caracteristica: Caracteristicas) => {
              this.caracteristicas[index] = caracteristica;

              // Calcular los valores combinados
              this.combinedPublicacion.titulo = 'Juego de muebles de ocasión';
              this.combinedPublicacion.precio += producto.precio;
              this.combinedPublicacion.titulos.push(publicacion.titulo);
              this.combinedPublicacion.idPublicaciones.push(publicacion.idPublicaciones); // Agrega esta línea
              this.combinedPublicacion.color += this.combinedPublicacion.color ? `, ${caracteristica.color.toLowerCase()}` : caracteristica.color;
              if (caracteristica.material.toLowerCase() !== lastMaterial) {
                this.combinedPublicacion.material += this.combinedPublicacion.material ? `, ${caracteristica.material.toLowerCase()}` : caracteristica.material;
                lastMaterial = caracteristica.material.toLowerCase();
              }
              this.combinedPublicacion.tiempoUso += this.combinedPublicacion.tiempoUso ? `, ${caracteristica.meses_uso} meses` : `${caracteristica.meses_uso} meses`;
            });

            // Get reviews
            this.reseniasService.listByVendedor(vendedor.idVendedores).subscribe((resenias: Resenias[]) => {
              this.resenias = [...this.resenias, ...resenias];
            });

            // Get purchases
            this.comprasService.list().subscribe((compras: Compras[]) => {
              this.compras = [...this.compras, ...compras.filter(compra => compra.publicacion.producto.vendedor.idVendedores === vendedor.idVendedores)];
            });
          });
        });
      });
    });
  }

  obtenerOtrasPublicaciones(cantidad: number): void {
    this.publicacionesService.list().subscribe(
      (todasPublicaciones: Publicaciones[]) => {
        // Filtrar las publicaciones cuyos productos tienen stock mayor a 0 y no son las publicaciones actuales
        const publicacionesDisponibles = todasPublicaciones.filter(
          (p) => !this.publicaciones.map(pub => pub.idPublicaciones).includes(p.idPublicaciones) && p.producto.stock > 0
        );

        // Obtener 4 publicaciones aleatorias
        this.otrasPublicaciones = this.obtenerElementosAleatorios(publicacionesDisponibles, cantidad);
      },
      (error) => {
        console.error('Error obteniendo otras publicaciones', error);
      }
    );
  }

  obtenerElementosAleatorios(arr: any[], cantidad: number): any[] {
    let result = new Array(cantidad),
        len = arr.length,
        taken = new Array(len);
    if (cantidad > len)
      throw new RangeError("obtenerElementosAleatorios: more elements taken than available");
    while (cantidad--) {
      let x = Math.floor(Math.random() * len);
      result[cantidad] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  agregarAlCarrito(): void {
    let carrito = this.obtenerCarrito();
    this.productos.forEach(producto => {
      if (producto.stock > 0) {
        let productoConTitulo = {
          ...producto,
          tituloPublicacion: this.combinedPublicacion.titulo,
          idPublicacion: this.combinedPublicacion.idPublicaciones
        };
        carrito.push(productoConTitulo);
        producto.stock -= 1; // reduce the stock by 1
      } else {
        this.mensaje="El producto está fuera de stock";
        this.snackBar.open(this.mensaje, 'Cerrar', {
          duration: 5000,
          verticalPosition: 'bottom', // 'top' | 'bottom'
          horizontalPosition: 'right', // 'start' | 'center' | 'end' | 'left' | 'right'
        });
      }
    });
    sessionStorage.setItem('carrito', JSON.stringify(carrito));
    this.mensaje="Se agregaron los productos al carrito";
    this.snackBar.open(this.mensaje, 'Cerrar', {
      duration: 5000,
      verticalPosition: 'bottom', // 'top' | 'bottom'
      horizontalPosition: 'right', // 'start' | 'center' | 'end' | 'left' | 'right'
    });
  }

  obtenerCarrito(): any[] {
    let carrito = sessionStorage.getItem('carrito');
    return carrito ? JSON.parse(carrito) : [];
  }

  totalCalificaciones(vendedor: Vendedores): number {
    let reseniasVendedor = this.resenias.filter(resenia => resenia.compra.publicacion.producto.vendedor.idVendedores === vendedor.idVendedores);
    let uniqueResenias = reseniasVendedor.filter((resenia, index, self) =>
      index === self.findIndex((r) => (
        r.idResenias === resenia.idResenias
      ))
    );
    return uniqueResenias.length;
  }

  promedioCalificaciones(vendedor: Vendedores): string {
    let reseniasVendedor = this.resenias.filter(resenia => resenia.compra.publicacion.producto.vendedor.idVendedores === vendedor.idVendedores);
    if (!Array.isArray(reseniasVendedor) || reseniasVendedor.length === 0) {
      return '0.0';
    }

    let sum = reseniasVendedor.reduce((a, b) => a + b.calificacion, 0);
    return (sum / reseniasVendedor.length).toFixed(1);
  }

  getCantidadVendida(vendedor: Vendedores): number {
    let comprasVendedor = this.compras.filter(compra => compra.publicacion.producto.vendedor.idVendedores === vendedor.idVendedores);
    let uniqueCompras = comprasVendedor.filter((compra, index, self) =>
      index === self.findIndex((c) => (
        c.idCompras === compra.idCompras
      ))
    );
    return uniqueCompras.length;
  }

  getPorcentajeCalificaciones(calificacion: number, vendedor: Vendedores): number {
    let reseniasVendedor = this.resenias.filter(resenia => resenia.compra.publicacion.producto.vendedor.idVendedores === vendedor.idVendedores);
    let totalResenias = reseniasVendedor.length;
    let reseniasConCalificacion = reseniasVendedor.filter(resenia => resenia.calificacion === calificacion).length;
    return totalResenias > 0 ? (reseniasConCalificacion / totalResenias) * 100 : 0;
  }
  getUniqueVendedores(): Vendedores[] {
    return this.vendedores.filter((vendedor, index, self) =>
      index === self.findIndex((v) => (
        v.idVendedores === vendedor.idVendedores
      ))
    )
  }
}
