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

@Component({
  selector: 'app-publicaciones-multiples',
  templateUrl: './publicaciones-multiples.component.html',
  styleUrls: ['./publicaciones-multiples.component.css']
})
export class PublicacionesMultiplesComponent implements OnInit {
  idPublicaciones!: string;
  publicaciones: Publicaciones[] = [];
  productos: Productos[] = [];
  vendedores: Vendedores[] = [];
  caracteristicas: Caracteristicas[] = [];
  combinedPublicacion: {
    titulo: string,
    precio: number,
    titulos: string[],
    color: string,
    material: string,
    tiempoUso: string
  } = {
    titulo: '',
    precio: 0,
    titulos: [],
    color: '',
    material: '',
    tiempoUso: ''
  };

  constructor(
    private route: ActivatedRoute,
    private publicacionesService: PublicacionesService,
    private productosService: ProductosService,
    private vendedoresService: VendedoresService,
    private caracteristicasService: CaracteristicasService
  ) { }

  ngOnInit(): void {
    const ids = this.route.snapshot.params['ids'].split('&').map((id: string) => parseInt(id));
    this.loadMultiplePublications(ids);
  }

  loadMultiplePublications(ids: number[]): void {
    const idsAsString = ids.map(id => id.toString());
    let lastMaterial = '';
    this.publicacionesService.getMultiple(ids).subscribe((publicaciones: Publicaciones[]) => {
      this.publicaciones = publicaciones;
      console.log('Los ids de publicaciones son', publicaciones);
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
              this.combinedPublicacion.color += this.combinedPublicacion.color ? `, ${caracteristica.color.toLowerCase()}` : caracteristica.color;
              if (caracteristica.material.toLowerCase() !== lastMaterial) {
                this.combinedPublicacion.material += this.combinedPublicacion.material ? `, ${caracteristica.material.toLowerCase()}` : caracteristica.material;
                lastMaterial = caracteristica.material.toLowerCase();
              }
              this.combinedPublicacion.tiempoUso += this.combinedPublicacion.tiempoUso ? `, ${caracteristica.meses_uso} meses` : `${caracteristica.meses_uso} meses`;
            });
          });
        });
      });
    });
  }
  agregarAlCarrito(): void {
    let carrito = this.obtenerCarrito();
    let publicacionCombinada = {
      titulo: this.combinedPublicacion.titulo,
      precio: this.combinedPublicacion.precio,
      imagen1: this.productos[0]?.imagen,
      imagen2: this.productos[1]?.imagen,
      imagen3: this.productos[2]?.imagen
    };
    carrito.push(publicacionCombinada);
    sessionStorage.setItem('carrito', JSON.stringify(carrito));
  }

  obtenerCarrito(): any[] {
    let carrito = sessionStorage.getItem('carrito');
    return carrito ? JSON.parse(carrito) : [];
  }
}
