import { Favoritos } from './../../models/favoritos';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Compras } from 'src/app/models/compras';
import { Publicaciones } from 'src/app/models/publicaciones';
import { CompradoresService } from 'src/app/services/compradores.service';
import { ComprasService } from 'src/app/services/compras.service';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { LoginService } from 'src/app/services/login.service';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { RoleService } from 'src/app/services/role.service';
import { VendedoresService } from 'src/app/services/vendedores.service';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ProductosService } from 'src/app/services/productos.service';
import { Vendedores } from 'src/app/models/vendedores';
import { Router } from '@angular/router';
import { CaracteristicasService } from 'src/app/services/caracteristicas.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { Categorias } from 'src/app/models/categorias';
import { Caracteristicas } from 'src/app/models/caracteristicas';
import { ProductosPriceDTO } from 'src/app/models/productospriceDTO';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  @ViewChild('chart') chart!: Chart;
  esVendedor = false;
  esComprador = false;
  opcionSeleccionada: string = this.esVendedor ? 'Invierte' : 'Registrarse';
  publicaciones: Publicaciones[] = [];
  favoritos: Favoritos[] = [];
  caracteristicas: Caracteristicas[]=[];
  categorias: Categorias[]=[];
  compras: Compras[] = [];
  ventas: Compras[] = [];
  p: number = 1;
  showImage = false;
  //gráfico de dona
  doughnutChartLabels: string[] = [
    'Menos de 1 año',
    '1 año',
    '2 años',
    '3 años',
    'Más de 3 años',
  ];
  doughnutChartData: number[] = [0, 0, 0, 0, 0];
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartOptions = {
    responsive: true,
  };

  //gráfico de barras
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  //gráfico de líneas
  lineChartOptions: ChartOptions = {
    responsive: true,
  };
  lineChartLabels: string[] = [];
  lineChartType: ChartType = 'line';
  lineChartLegend = true;
  lineChartData: ChartDataset[] = [];
  selectedCategory!: string;
  selectedMaterial!: string;
  uniqueMaterials: string[]=[]

  constructor(
    private loginService: LoginService,
    private roleService: RoleService,
    private vendedoresService: VendedoresService,
    private publicacionesService: PublicacionesService,
    private compradoresService: CompradoresService,
    private favoritosService: FavoritosService,
    private comprasService: ComprasService,
    private productosService: ProductosService,
    private caracteristicasService: CaracteristicasService,
    private categoriasService: CategoriasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerRoles();
    this.obtenerPublicaciones();
    this.obtenerFavoritos();
    this.obtenerCompras();
    this.obtenerVentas();
    this.obtenerReportes();
    this.obtenerTopDistritos();
    this.obtenerCategoriasYCaracteristicas();
  }

  obtenerRoles(): void {
    const username = this.loginService.getUsername();
    this.roleService.getRolesForUser(username).subscribe((roles) => {
      this.esVendedor = roles.some((role) => role.rol === 'VENDEDOR');
      this.esComprador = roles.some((role) => role.rol === 'COMPRADOR');
      this.opcionSeleccionada = this.esVendedor ? 'Invierte' : 'Registrarse';
    });
  }

  obtenerPublicaciones(): void {
    const username = this.loginService.getUsername();
    this.roleService.getRolesForUser(username).subscribe((roles) => {
      this.esVendedor = roles.some((role) => role.rol === 'VENDEDOR');
      if (this.esVendedor) {
        this.vendedoresService.list().subscribe((vendedores) => {
          const vendedor = vendedores.find((v) => v.user.username === username);
          if (vendedor) {
            this.publicacionesService
              .getPublicacionesForVendedor(vendedor.idVendedores)
              .subscribe((publicaciones) => {
                this.publicaciones = publicaciones;
              });
          }
        });
      }
    });
  }

  obtenerFavoritos(): void {
    const username = this.loginService.getUsername();
    this.roleService.getRolesForUser(username).subscribe((roles) => {
      this.esComprador = roles.some((role) => role.rol === 'COMPRADOR');
      if (this.esComprador) {
        this.compradoresService.list().subscribe((compradores) => {
          const comprador = compradores.find(
            (c) => c.user.username === username
          );
          if (comprador) {
            this.favoritosService.list().subscribe((favoritos) => {
              this.favoritos = favoritos.filter(
                (favorito) =>
                  favorito.comprador.idCompradores === comprador.idCompradores
              );
            });
          }
        });
      }
    });
  }

  obtenerCompras(): void {
    const username = this.loginService.getUsername();
    this.roleService.getRolesForUser(username).subscribe((roles) => {
      this.esComprador = roles.some((role) => role.rol === 'COMPRADOR');
      if (this.esComprador) {
        this.compradoresService.list().subscribe((compradores) => {
          const comprador = compradores.find(
            (c) => c.user.username === username
          );
          if (comprador) {
            this.comprasService.list().subscribe((compras) => {
              this.compras = compras.filter(
                (compra) =>
                  compra.comprador.idCompradores === comprador.idCompradores
              );
            });
          }
        });
      }
    });
  }

  obtenerVentas(): void {
    const username = this.loginService.getUsername();
    this.roleService.getRolesForUser(username).subscribe((roles) => {
      this.esVendedor = roles.some((role) => role.rol === 'VENDEDOR');
      if (this.esVendedor) {
        this.vendedoresService.list().subscribe((vendedores) => {
          const vendedor = vendedores.find((v) => v.user.username === username);
          if (vendedor) {
            this.comprasService.list().subscribe((compras) => {
              this.ventas = compras.filter(
                (compra) =>
                  compra.publicacion.producto.vendedor.idVendedores ===
                  vendedor.idVendedores
              );
            });
          }
        });
      }
    });
  }

  obtenerReportes() {
    this.productosService.getMesesUso().subscribe((data) => {
      data.forEach((item) => {
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
  obtenerTopDistritos(): void {
    this.productosService.getTopDistritos().subscribe((data) => {
      let datasetData: number[] = [];
      data.forEach((item) => {
        this.barChartLabels.push(item.distrito);
        datasetData.push(item.totalVentas);
      });
      this.barChartData.push({ data: datasetData, label: 'Ventas por distrito' });
    });
  }

  obtenerCategoriasYCaracteristicas(): void {
    this.categoriasService.list().subscribe((categorias) => {
      this.categorias = categorias.filter(categoria => categoria.idCategorias !== 1);
      if (this.categorias.length > 0) {
        this.selectedCategory = this.categorias[0].tipo;
      }
    });

    this.caracteristicasService.list().subscribe((caracteristicas) => {
      this.uniqueMaterials = Array.from(new Set(caracteristicas.map(c => c.material)));
      if (this.uniqueMaterials.length > 0) {
        this.selectedMaterial = this.uniqueMaterials[0];
      }
      // Llama a obtenerPreciosPorCategoriaYMaterial después de obtener las categorías y características
      this.obtenerPreciosPorCategoriaYMaterial();
    });
  }

  obtenerPreciosPorCategoriaYMaterial(): void {
    this.productosService.getPricesByCategoryAndMaterial(this.selectedCategory, this.selectedMaterial).subscribe((productosPriceDTO: ProductosPriceDTO[]) => {
      // Limpiar los datos del gráfico
      this.lineChartLabels = [];
      this.lineChartData = [];

      let datasetData: number[] = [];
      productosPriceDTO.forEach((productoPrice) => {
        const date = new Date(productoPrice.fecha);
        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const monthName = monthNames[date.getMonth()];
        this.lineChartLabels.push(monthName);
        datasetData.push(productoPrice.precio);
      });
      this.lineChartData.push({ data: datasetData, label: `Precios de ${this.selectedMaterial} en ${this.selectedCategory}` });

      // Forzar la actualización del gráfico
      this.chart.update();
    });
  }

  seleccionarOpcion(opcion: string): void {
    this.opcionSeleccionada = opcion;
  }

  goToServices(): void {
    const username = this.loginService.getUsername();
    this.vendedoresService.findByUsername(username).subscribe((vendedor: Vendedores) => {
      this.router.navigate(['/servicios', vendedor.idVendedores]);
    });
  }
}
