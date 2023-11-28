import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from '../../../services/categorias.service';
import { CaracteristicasService } from '../../../services/caracteristicas.service';
import { ProductosService } from '../../../services/productos.service';
import { PublicacionesService } from '../../../services/publicaciones.service';
import { VendedoresService } from '../../../services/vendedores.service';
import { LoginService } from 'src/app/services/login.service';
import { CompradoresService } from 'src/app/services/compradores.service';
import { Productos } from 'src/app/models/productos';
import { Caracteristicas } from 'src/app/models/caracteristicas';
import { Categorias } from 'src/app/models/categorias';
import { Vendedores } from 'src/app/models/vendedores';
import { Publicaciones } from 'src/app/models/publicaciones';
import { forkJoin } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nuevas-publicaciones',
  templateUrl: './nuevas-publicaciones.component.html',
  styleUrls: ['./nuevas-publicaciones.component.css'],
})
export class NuevasPublicacionesComponent implements OnInit {
  form!: FormGroup;
  categorias: Categorias[] = [];
  publicacion: Publicaciones = new Publicaciones();
  distritos = [
    'Cercado de Lima',
    'Ate',
    'Barranco',
    'Breña',
    'Comas',
    'Chorrillos',
    'El Agustino',
    'Jesús María',
    'La Molina',
    'La Victoria',
    'Lince',
    'Magdalena del Mar',
    'Miraflores',
    'Pueblo Libre',
    'Puente Piedra',
    'Rímac',
    'San Isidro',
    'Independencia',
    'San Juan de Miraflores',
    'San Luis',
    'San Martín de Porres',
    'San Miguel',
    'Santiago de Surco',
    'Surquillo',
    'Villa María del Triunfo',
    'San Juan de Lurigancho',
    'Santa Rosa',
    'Los Olivos',
    'San Borja',
    'Villa El Salvador',
    'Santa Anita',
  ];
  nombre: string = '';
  previewUrl: string = '';
  mensaje: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private categoriasService: CategoriasService,
    private caracteristicasService: CaracteristicasService,
    private productosService: ProductosService,
    private publicacionesService: PublicacionesService,
    private vendedoresService: VendedoresService,
    private loginService: LoginService,
    private compradoresService: CompradoresService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      imagen: ['', Validators.required],
      categoria: ['', Validators.required],
      distrito: ['', Validators.required],
      material: ['', Validators.required],
      color: ['', Validators.required],
      tiempoUso: ['', Validators.required],
      largo: ['', Validators.required],
      ancho: ['', Validators.required],
      alto: ['', Validators.required],
    });

    this.categoriasService.list().subscribe((categorias) => {
      this.categorias = categorias;
    });

    this.getVendedor();
  }

  updatePreview(): void {
    this.previewUrl = this.form.value.imagen;
  }

  publicarProducto(): void {
    const username = this.loginService.getUsername();
    this.vendedoresService.findByUsername(username).subscribe((vendedor: Vendedores) => {
      vendedor.distrito = this.form.value.distrito;

      const caracteristica = new Caracteristicas();
      caracteristica.color = this.form.value.color;
      caracteristica.dimensiones = `${this.form.value.largo} X ${this.form.value.ancho} X ${this.form.value.alto}`;
      caracteristica.material = this.form.value.material;
      caracteristica.meses_uso = this.form.value.tiempoUso;

      const producto = new Productos();
      producto.precio = this.form.value.precio;
      producto.imagen = this.form.value.imagen;
      producto.vendedor = vendedor;

      const categoria = new Categorias();
      categoria.tipo = this.form.value.categoria;

      this.categoriasService.findByType(this.form.value.categoria).subscribe((categoria: Categorias) => {
        producto.categoria = categoria;

        // Guardar la característica
        this.caracteristicasService.insert(caracteristica).subscribe((caracteristicaInsertada: any) => {
          producto.stock = 1;
          producto.caracteristica = caracteristicaInsertada;

          // Ahora puedes guardar el producto
          this.productosService.insert(producto).subscribe(
            (productoInsertado: any) => {
              // Una vez que el producto se ha guardado, asignarlo a la publicación
              const publicacion = new Publicaciones();
              publicacion.titulo = this.form.value.titulo;
              publicacion.descripcion = this.form.value.descripcion;
              publicacion.producto = productoInsertado;

              // Guardar la publicación
              this.publicacionesService.insert(publicacion).subscribe(
                (result) => {
                  this.mensaje="Se publicó tu producto correctamente";
                  this.snackBar.open(this.mensaje, 'Cerrar', {
                    duration: 5000,
                    verticalPosition: 'bottom', // 'top' | 'bottom'
                    horizontalPosition: 'right', // 'start' | 'center' | 'end' | 'left' | 'right'
                  });
                },
                (error) => {
                  // console.error('Error al insertar la publicación:', error);
                }
              );
            },
            (error) => {
              // console.error('Error al insertar el producto:', error);
            }
          );
        },
        (error) => {
          // console.error('Error al buscar el vendedor:', error);
        });
      });
    });
  }

  getVendedor(): void {
    const username = this.loginService.getUsername();
    if (username) {
      this.compradoresService.findByUsername(username).subscribe((data) => {
        if (data) {
          this.nombre = data.nombres;
        }
      });
    }
  }
}
