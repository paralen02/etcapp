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

  constructor(
    private route: ActivatedRoute,
    private publicacionesService: PublicacionesService,
    private productosService: ProductosService,
    private caracteristicasService: CaracteristicasService,
    private vendedoresService: VendedoresService
  ) {}

  ngOnInit(): void {
    this.idPublicaciones = this.route.snapshot.params['id'];

    this.publicacionesService
      .listId(this.idPublicaciones)
      .subscribe((publicacion: Publicaciones) => {
        this.publicacion = publicacion;

        this.productosService
          .listId(publicacion.producto.idProductos)
          .subscribe((producto: Productos) => {
            this.producto = producto;

            this.vendedoresService
              .listId(producto.vendedor.idVendedores)
              .subscribe((vendedor: Vendedores) => {
                this.vendedor = vendedor;

                this.caracteristicasService
                  .listId(producto.caracteristica.idCaracteristicas)
                  .subscribe((caracteristica: Caracteristicas) => {
                    this.caracteristica = caracteristica;
                    const dimensiones = caracteristica.dimensiones.split(' x ');
                    this.alto = dimensiones[0];
                    this.largo = dimensiones[1];
                    this.ancho = dimensiones[2];
                  });
              });
          });
      });
  }
  agregarAlCarrito(): void {
    let carrito = this.obtenerCarrito();
    let productoConTitulo = {
      ...this.producto,
      tituloPublicacion: this.publicacion.titulo
    };
    carrito.push(productoConTitulo);
    sessionStorage.setItem('carrito', JSON.stringify(carrito));
  }

  obtenerCarrito(): Productos[] {
    let carrito = sessionStorage.getItem('carrito');
    return carrito ? JSON.parse(carrito) : [];
  }
}
