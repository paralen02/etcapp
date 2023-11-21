import { Component, Input} from '@angular/core';
import { Productos } from 'src/app/models/productos';
import { Publicaciones } from 'src/app/models/publicaciones';
import { Vendedores } from 'src/app/models/vendedores';
import { ProductosService } from 'src/app/services/productos.service';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { VendedoresService } from 'src/app/services/vendedores.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent{
  @Input() idPublicacion: number = 0;
  @Input() idVendedor: number = 0;
  @Input() idProducto: number = 0;
  publicaciones: Publicaciones[] = [];
  vendedores: Vendedores[]=[];
  productos:Productos[]=[];
  constructor(
    private publicacionesService: PublicacionesService,
    private vendedoresService: VendedoresService,
    private productosService: ProductosService
    ) {}

  ngOnInit() {
    this.init();
  }

  init(){
    // Get all publicaciones and then filter them by idProducto where .idProducto = input idProducto and print in the console
    this.publicacionesService.list().subscribe((data) => {
      this.publicaciones = data;
    });
    this.vendedoresService.list().subscribe((data) => {
      this.vendedores = data;
    });
    this.productosService.list().subscribe((data) => {
      this.productos = data;
    });
  }

}
