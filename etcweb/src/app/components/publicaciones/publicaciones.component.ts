import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Publicaciones } from './../../models/publicaciones';
import { Productos } from 'src/app/models/productos';
import { Caracteristicas } from 'src/app/models/caracteristicas';
import { PublicacionesService } from './../../services/publicaciones.service';
import { ProductosService } from 'src/app/services/productos.service';
import { CaracteristicasService } from 'src/app/services/caracteristicas.service';
import { Vendedores } from 'src/app/models/vendedores';
import { VendedoresService } from 'src/app/services/vendedores.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css'],
})
export class PublicacionesComponent implements OnInit {
  idPublicaciones: number = 0;
  ids: number[] = [];
  publicaciones: Publicaciones[] = [];
  productos: Productos[] = [];
  caracteristicas: Caracteristicas[] = [];
  publicacion: Publicaciones = new Publicaciones();
  producto: Productos = new Productos();
  caracteristica: Caracteristicas = new Caracteristicas();
  vendedor: Vendedores = new Vendedores();
  alto: string = ""
  largo: string = ""
  ancho: string = ""
  mensaje: string=""

  constructor(
    private route: ActivatedRoute,
    private publicacionesService: PublicacionesService,
    private productosService: ProductosService,
    private caracteristicasService: CaracteristicasService,
    private vendedoresService: VendedoresService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.idPublicaciones = this.route.snapshot.params['id'];

    this.publicacionesService
      .listId(this.idPublicaciones)
      .subscribe((publicacion: Publicaciones) => {
        this.publicacion = publicacion;
        this.obtenerOtrasPublicaciones(3);

        this.productosService
          .listId(publicacion.producto.idProductos)
          .subscribe((producto: Productos) => {
            this.producto = producto;

          // Check if the product is already in the cart
          let carrito = this.obtenerCarrito();
          let cantidadEnCarrito = carrito.filter(p => p.idProductos === this.producto.idProductos).length;
          this.producto.stock -= cantidadEnCarrito;

            this.vendedoresService
              .listId(producto.vendedor.idVendedores)
              .subscribe((vendedor: Vendedores) => {
                this.vendedor = vendedor;

                this.caracteristicasService
                  .listId(producto.caracteristica.idCaracteristicas)
                  .subscribe((caracteristica: Caracteristicas) => {
                    this.caracteristica = caracteristica;
                    const dimensiones = caracteristica.dimensiones.split(' X ');
                    this.alto = dimensiones[0];
                    this.largo = dimensiones[1];
                    this.ancho = dimensiones[2];
                  });
              });
          });
      });
  }

  obtenerOtrasPublicaciones(cantidad: number): void {
    this.publicacionesService.list().subscribe(
      (todasPublicaciones: Publicaciones[]) => {
        const otrasPublicaciones = todasPublicaciones.filter((p) => p.idPublicaciones !== this.idPublicaciones);
        this.publicaciones = this.obtenerElementosAleatorios(otrasPublicaciones, cantidad);
      },
      (error) => {
        console.error('Error al obtener todas las publicaciones', error);
      }
    );
  }

  obtenerElementosAleatorios(array: any[], n: number): any[] {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  }

  agregarAlCarrito(): void {
    if (this.producto.stock > 0) {
      let carrito = this.obtenerCarrito();
      let productoConTitulo = {
        ...this.producto,
        tituloPublicacion: this.publicacion.titulo,
        idPublicacion: this.publicacion.idPublicaciones
      };
      carrito.push(productoConTitulo);
      sessionStorage.setItem('carrito', JSON.stringify(carrito));
      this.mensaje="Se agregó el producto al carrito";
      this.snackBar.open(this.mensaje, 'Cerrar', {
        duration: 5000,
        verticalPosition: 'bottom', // 'top' | 'bottom'
        horizontalPosition: 'right', // 'start' | 'center' | 'end' | 'left' | 'right'
      });
      this.producto.stock -= 1; // reduce the stock by 1
    } else {
      this.mensaje="El producto está fuera de stock";
      this.snackBar.open(this.mensaje, 'Cerrar', {
        duration: 5000,
        verticalPosition: 'bottom', // 'top' | 'bottom'
        horizontalPosition: 'right', // 'start' | 'center' | 'end' | 'left' | 'right'
      });
    }
  }

  obtenerCarrito(): Productos[] {
    let carrito = sessionStorage.getItem('carrito');
    return carrito ? JSON.parse(carrito) : [];
  }
}
