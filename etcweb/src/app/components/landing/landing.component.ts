import { MatDialog } from '@angular/material/dialog';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { ProductosService } from 'src/app/services/productos.service';
import { SearchService } from 'src/app/services/search.service';
import { Subscription } from 'rxjs';
import { VendedoresService } from 'src/app/services/vendedores.service';
import { FiltersComponent } from '../filters/filters.component';
import { CategoriasService } from 'src/app/services/categorias.service';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { LoginService } from 'src/app/services/login.service';
import { Favoritos } from 'src/app/models/favoritos';
import { CompradoresService } from 'src/app/services/compradores.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  imagen: any[]=[];
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
  categoriaActiva: any = null;
  p:number=1;
  mensaje: string = ""

  constructor(
    private publicacionesService: PublicacionesService,
    private productosService: ProductosService,
    private vendedoresService: VendedoresService,
    private searchService: SearchService,
    private categoriasService: CategoriasService,
    private favoritosService: FavoritosService,
    private loginService: LoginService,
    private compradoresService: CompradoresService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
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
            const producto = this.productos.find(p => p.idProductos === publicacion.producto.idProductos);
            const vendedor = this.vendedores.find(v => v.idVendedores === publicacion.producto.vendedor.idVendedores);

            // Si el producto no tiene stock, devuelve null
            if (producto && producto.stock <= 0) {
              return null;
            }

            const item = {
              id: publicacion.idPublicaciones,
              titulo: publicacion.titulo,
              precio: producto ? producto.precio : undefined,
              distrito: vendedor ? vendedor.distrito : undefined,
              imagen: producto ? producto.imagen : undefined,
              categoria: producto ? producto.categoria.idCategorias : undefined,
            };

            // Verifica si el artículo está en favoritos
            this.esFavorito(item);

            return item;
          });

          // Filtra los null de la lista de items
          this.items = this.items.filter(item => item !== null);
          this.filteredItems = this.items;

          this.searchSubscription = this.searchService.searchObservable.subscribe((searchValue) => {
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
    const dialogRef = this.dialog.open(FiltersComponent, {

    });

    dialogRef.afterClosed().subscribe(filters => {
      console.log('Filters:', filters); // Log the filters

      if (filters) {
        this.filteredItems = this.items.filter(item => {
          let matchesPrice = item.precio <= filters.priceRange;
          let matchesCategory = item.categoria === filters.category;

          console.log('Item:', item); // Log each item
          console.log('Matches Price:', matchesPrice); // Log whether it matches the price
          console.log('Matches Category:', matchesCategory); // Log whether it matches the category

          return matchesPrice && matchesCategory;
        });
      } else {
        // Si no hay filtros, mostrar todos los elementos
        this.filteredItems = this.items;
      }

      console.log('Filtered Items:', this.filteredItems); // Log the filtered items
    });
  }

  scrollRight() {
    this.iconBar.nativeElement.scrollLeft += 100;
  }

  filtrarPorCategoria(categoria: any) {
    this.categoriaActiva = categoria;
    if (categoria && categoria.idCategorias) {
      this.categoriaSeleccionada = categoria.idCategorias;
      if (this.categoriaSeleccionada) {
        if (this.categoriaSeleccionada === 1) {
          // Para la categoría especial (id 1), asignar otras publicaciones aleatorias
          this.filteredItems = this.generarPublicacionesAleatorias();
        } else {
          // Para otras categorías, filtrar normalmente
          this.filteredItems = this.items.filter(
            (item) => item.categoria === this.categoriaSeleccionada
          );
        }
      } else {
        // Si no hay categoría seleccionada, mostrar todos los elementos
        this.filteredItems = this.items;
      }
    }
  }

  esCategoriaActiva(categoria: any): boolean {
    return this.categoriaActiva && this.categoriaActiva.idCategorias === categoria.idCategorias;
  }

  generarPublicacionesAleatorias(): any[] {
    // Generar 4 publicaciones
    const publicacionesAleatorias = Array.from({ length: 4 }, () => {
      // Obtener índices aleatorios de publicaciones (excluyendo la primera)
      const indicesAleatorios = this.items
        .map((_, index) => index)
        .filter((index) => index !== 0) // Excluir la primera publicación
        .sort(() => Math.random() - 0.5)
        .slice(0, 3); // Obtener los primeros 3 índices aleatorios

      // Calcular el precio total de los productos seleccionados
      const precioTotal = indicesAleatorios.reduce((total, indice) => total + this.items[indice - 1].precio, 0);

      // Obtener las publicaciones aleatorias utilizando los índices seleccionados
      const currentItem = this.items[indicesAleatorios[0] - 1];

      // Generar el link para la publicación actual
      const link = `/conjugaciones/${indicesAleatorios.map(indice => this.items[indice - 1].id).join('&')}`;

      return {
        id: currentItem.id,
        titulo: 'Conjugación Especial',
        precio: precioTotal,
        distrito: currentItem.distrito,
        imagen: currentItem.imagen,
        categoria: 1,
        link: link, // Agregar el link a la publicación
      };
    });

    // Devolver las publicaciones aleatorias
    return publicacionesAleatorias;
  }

  getPublicacionTitulo(item: any, index: number): string {
    if (this.categoriaSeleccionada === 1) {
      // Para la categoría especial (id 1), mostrar "Conjugación x"
      return `Conjugación ${index + 1}`;
    } else {
      // Para otras categorías, mostrar el título normal
      return item.titulo;
    }
  }
  agregarAFavoritos(item: any): void {
    const username = this.loginService.getUsername();
    if (username && item && item.id) {
      this.compradoresService.findByUsername(username).subscribe((comprador) => {
        if (comprador) {
          this.favoritosService.esFavorito(comprador.idCompradores, item.id).subscribe((esFavorito) => {
            if (!esFavorito) {
              this.publicacionesService.listId(item.id).subscribe((publicacion) => {
                const favorito = new Favoritos();
                favorito.comprador = comprador;
                favorito.publicacion = publicacion;

                this.favoritosService.insert(favorito).subscribe(() => {
                  item.esFavorito = true;
                  this.mensaje="Se agregó la publicación a favoritos";
                  this.snackBar.open(this.mensaje, 'Cerrar', {
                    duration: 5000,
                    verticalPosition: 'bottom', // 'top' | 'bottom'
                    horizontalPosition: 'right', // 'start' | 'center' | 'end' | 'left' | 'right'
                  });
                });
              });
            } else {
              this.favoritosService.delete(comprador.idCompradores, item.id).subscribe(() => {
                item.esFavorito = false;
                this.mensaje="Se eliminó la publicación de favoritos";
                this.snackBar.open(this.mensaje, 'Cerrar', {
                  duration: 5000,
                  verticalPosition: 'bottom', // 'top' | 'bottom'
                  horizontalPosition: 'right', // 'start' | 'center' | 'end' | 'left' | 'right'
                });
              });
            }
          });
        }
      });
    } else {
    }
  }
  esFavorito(item: any): void {
    const username = this.loginService.getUsername();
    if (username) {
      this.compradoresService.findByUsername(username).subscribe((comprador) => {
        if (comprador) {
          this.favoritosService.esFavorito(comprador.idCompradores, item.id).subscribe((esFavorito) => {
            item.esFavorito = esFavorito;
          });
        }
      });
    }
  }
}
