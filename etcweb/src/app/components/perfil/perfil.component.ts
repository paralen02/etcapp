import { Favoritos } from './../../models/favoritos';
import { Component, OnInit } from '@angular/core';
import { Compras } from 'src/app/models/compras';
import { Publicaciones } from 'src/app/models/publicaciones';
import { CompradoresService } from 'src/app/services/compradores.service';
import { ComprasService } from 'src/app/services/compras.service';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { LoginService } from 'src/app/services/login.service';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { RoleService } from 'src/app/services/role.service';
import { VendedoresService } from 'src/app/services/vendedores.service';
import { ChartType } from 'chart.js';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit{
  esVendedor = false;
  esComprador = false;
  opcionSeleccionada: string = this.esVendedor ? 'Favoritos' : 'Mis publicaciones';
  publicaciones: Publicaciones[] = [];
  favoritos: Favoritos[]=[];
  compras: Compras[]=[];
  ventas: Compras[]=[];
  p: number = 1;

  doughnutChartLabels: string[] = ['Menos de 1 año', '1 año', '2 años', '3 años', 'Más de 3 años'];
  doughnutChartData: number[] = [0, 0, 0, 0, 0];
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartOptions = {
    responsive: true,
  };

  constructor(
    private loginService: LoginService,
    private roleService: RoleService,
    private vendedoresService: VendedoresService,
    private publicacionesService: PublicacionesService,
    private compradoresService: CompradoresService,
    private favoritosService: FavoritosService,
    private comprasService: ComprasService,
    private productosService: ProductosService
    ) {}

    ngOnInit(): void {
      this.obtenerPublicaciones();
      this.obtenerFavoritos();
      this.obtenerCompras();
      this.obtenerVentas();
      this.obtenerReportes();
    }

    obtenerPublicaciones(): void {
      const username = this.loginService.getUsername();
      this.roleService.getRolesForUser(username).subscribe(roles => {
        this.esVendedor = roles.some(role => role.rol === 'VENDEDOR');
        if (this.esVendedor) {
          this.vendedoresService.list().subscribe(vendedores => {
            const vendedor = vendedores.find(v => v.user.username === username);
            if (vendedor) {
              this.publicacionesService.getPublicacionesForVendedor(vendedor.idVendedores).subscribe(publicaciones => {
                this.publicaciones = publicaciones;
              });
            }
          });
        }
      });
    }

    obtenerFavoritos(): void {
      const username = this.loginService.getUsername();
      this.roleService.getRolesForUser(username).subscribe(roles => {
        this.esComprador = roles.some(role => role.rol === 'COMPRADOR');
        if (this.esComprador) {
          this.compradoresService.list().subscribe(compradores => {
            const comprador = compradores.find(c => c.user.username === username);
            if (comprador) {
              this.favoritosService.list().subscribe(favoritos => {
                this.favoritos = favoritos.filter(favorito => favorito.comprador.idCompradores === comprador.idCompradores);
              });
            }
          });
        }
      });
    }

    obtenerCompras(): void {
      const username = this.loginService.getUsername();
      this.roleService.getRolesForUser(username).subscribe(roles => {
        this.esComprador = roles.some(role => role.rol === 'COMPRADOR');
        if (this.esComprador) {
          this.compradoresService.list().subscribe(compradores => {
            const comprador = compradores.find(c => c.user.username === username);
            if (comprador) {
              this.comprasService.list().subscribe(compras => {
                this.compras = compras.filter(compra => compra.comprador.idCompradores === comprador.idCompradores);
              });
            }
          });
        }
      });
    }

    obtenerVentas(): void {
      const username = this.loginService.getUsername();
      this.roleService.getRolesForUser(username).subscribe(roles => {
        this.esVendedor = roles.some(role => role.rol === 'VENDEDOR');
        if (this.esVendedor) {
          this.vendedoresService.list().subscribe(vendedores => {
            const vendedor = vendedores.find(v => v.user.username === username);
            if (vendedor) {
              this.comprasService.list().subscribe(compras => {
                this.ventas = compras.filter(compra => compra.publicacion.producto.vendedor.idVendedores === vendedor.idVendedores);
              });
            }
          });
        }
      });
    }

    obtenerReportes() {
      this.productosService.getMesesUso().subscribe(data => {
        data.forEach(item => {
          const years = item.meses_uso / 12;
          // console.log(`Meses de uso: ${item.meses_uso}, Años: ${years}`);
          if (years < 1) {
            this.doughnutChartData[0]++;
          } else if (years >= 1 && years < 2) {
            this.doughnutChartData[1]++;
          } else if (years >= 2 && years < 3) {
            this.doughnutChartData[2]++;
          } else if (years >= 3 && years < 4) {
            this.doughnutChartData[3]++;
          } else {
            this.doughnutChartData[4]++;
          }
        });
      });
    }



  seleccionarOpcion(opcion: string): void {
    this.opcionSeleccionada = opcion;
  }
}
