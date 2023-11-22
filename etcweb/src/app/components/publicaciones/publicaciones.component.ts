import { Productos } from 'src/app/models/productos';
import { Publicaciones } from './../../models/publicaciones';
import { PublicacionesService } from './../../services/publicaciones.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Caracteristicas } from 'src/app/models/caracteristicas';
import { ProductosService } from 'src/app/services/productos.service';
import { CaracteristicasService } from 'src/app/services/caracteristicas.service';
import { forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css']
})
export class PublicacionesComponent implements OnInit {
  idProductos:number = 0;
  idPublicaciones:number=0;
  idCaracteristicas:number=0;
  publicacion: Publicaciones = new Publicaciones;
  producto: Productos = new Productos;
  caracteristica: Caracteristicas = new Caracteristicas

  constructor(
    private route: ActivatedRoute,
    private publicacionesService: PublicacionesService,
    private productosService: ProductosService,
    private caracteristicasService: CaracteristicasService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.publicacionesService.listId(id).pipe(
      switchMap(publicacion => {
        this.publicacion = publicacion;
        return this.productosService.listId(publicacion.producto.idProductos);
      }),
      switchMap(producto => {
        this.producto = producto;
        return this.caracteristicasService.listId(producto.caracteristica.idCaracteristicas);
      })
    ).subscribe(caracteristica => {
      this.caracteristica = caracteristica;
    });
  }
}

