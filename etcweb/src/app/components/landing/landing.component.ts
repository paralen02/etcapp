import { Component, OnInit } from '@angular/core';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { ProductosService } from 'src/app/services/productos.service';
import { SearchService } from 'src/app/services/search.service';
import { Subscription } from 'rxjs';
import { VendedoresService } from 'src/app/services/vendedores.service';
import { Vendedores } from 'src/app/models/vendedores';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  publicaciones: any[] = [];
  productos: any[] = [];
  vendedores: any[]=[];
  items: any[] = [];
  filteredItems: any[] = [];
  searchSubscription: Subscription = new Subscription();

  constructor(
    private publicacionesService: PublicacionesService,
    private productosService: ProductosService,
    private vendedoresService: VendedoresService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.publicacionesService.list().subscribe(publicaciones => {
      this.publicaciones = publicaciones;

      this.productosService.list().subscribe(productos => {
        this.productos = productos;

        this.vendedoresService.list().subscribe(vendedores => {
          this.vendedores = vendedores;

          this.items = this.publicaciones.map((publicacion, index) => {
            return {
              titulo: publicacion.titulo,
              precio: this.productos[index] ? this.productos[index].precio : undefined,
              distrito: this.vendedores[index] ? this.vendedores[index].distrito : undefined
            };
          });

          this.filteredItems = this.items;

          this.searchSubscription = this.searchService.searchObservable.subscribe(searchValue => {
            this.filteredItems = this.items.filter(item => item.titulo.toLowerCase().includes(searchValue.toLowerCase()));
          });
        });
      });
    });
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}
