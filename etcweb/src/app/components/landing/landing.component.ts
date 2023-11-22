import { MatDialog } from '@angular/material/dialog';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { ProductosService } from 'src/app/services/productos.service';
import { SearchService } from 'src/app/services/search.service';
import { Subscription } from 'rxjs';
import { VendedoresService } from 'src/app/services/vendedores.service';
import { FiltersComponent } from '../filters/filters.component';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  @ViewChild('iconBar') iconBar!: ElementRef;
  publicaciones: any[] = [];
  productos: any[] = [];
  vendedores: any[] = [];
  items: any[] = [];
  categorias: any[] = [];
  iconos: string[] = [
    'tips_and_updates',
    'desk',
    'shelves',
    'chair',
    'table_bar',
    'bed',
    'table_restaurant',
    'chair_alt',
  ];
  filteredItems: any[] = [];
  searchSubscription: Subscription = new Subscription();
  categoriaSeleccionada: any = null;

  constructor(
    private publicacionesService: PublicacionesService,
    private productosService: ProductosService,
    private vendedoresService: VendedoresService,
    private searchService: SearchService,
    private categoriasService: CategoriasService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.categoriasService.list().subscribe((categorias) => {
      this.categorias = categorias;
    });
    this.publicacionesService.list().subscribe((publicaciones) => {
      this.publicaciones = publicaciones;

      this.productosService.list().subscribe((productos) => {
        this.productos = productos;

        this.vendedoresService.list().subscribe((vendedores) => {
          this.vendedores = vendedores;

          this.items = this.publicaciones.map((publicacion, index) => {
            return {
              id: publicacion.idPublicaciones,
              titulo: publicacion.titulo,
              precio: this.productos[index]
                ? this.productos[index].precio
                : undefined,
              distrito: this.vendedores[index]
                ? this.vendedores[index].distrito
                : undefined,
            };
          });

          this.filteredItems = this.items;

          this.searchSubscription =
            this.searchService.searchObservable.subscribe((searchValue) => {
              this.filteredItems = this.items.filter((item) =>
                item.titulo.toLowerCase().includes(searchValue.toLowerCase())
              );
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

  openFilters(): void {
    this.dialog.open(FiltersComponent, {
      width: 'auto',
      height: 'auto',
    });
  }
  scrollLeft() {
    this.iconBar.nativeElement.scrollLeft -= 100;
  }

  scrollRight() {
    this.iconBar.nativeElement.scrollLeft += 100;
  }
  // Implementa la función filtrarPorCategoria
  filtrarPorCategoria(categoria: any) {
    this.categoriaSeleccionada = categoria.idCategorias;
    console.log('CategoriaId: ',categoria)
    this.filteredItems = this.items.filter(item => item.producto && item.producto.categoriaId === categoria.idCategorias);
  }
}
