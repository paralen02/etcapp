//MODULES
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { ComponentsRoutingModule } from './components-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgChartsModule } from 'ng2-charts';

//COMPONENTS
import { AsesoriasComponent } from './asesorias/asesorias.component';
import { CaracteristicasComponent } from './caracteristicas/caracteristicas.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ChatsComponent } from './chats/chats.component';
import { CompradoresComponent } from './compradores/compradores.component';
import { ComprasComponent } from './compras/compras.component';
import { PagosComponent } from './pagos/pagos.component';
import { ProductosComponent } from './productos/productos.component';
import { RoleComponent } from './role/role.component';
import { UsersComponent } from './users/users.component';
import { ListarAsesoriasComponent } from './asesorias/listar-asesorias/listar-asesorias.component';
import { CreaeditaAsesoriasComponent } from './asesorias/creaedita-asesorias/creaedita-asesorias.component';
import { EnviosComponent } from './envios/envios.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { OperacionesComponent } from './operaciones/operaciones.component';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { RepartidoresComponent } from './repartidores/repartidores.component';
import { VendedoresComponent } from './vendedores/vendedores.component';
import { SignupCompradorComponent } from './signup/signup-comprador/signup-comprador.component';
import { SignupVendedorComponent } from './signup/signup-vendedor/signup-vendedor.component';
import { FiltersComponent } from './filters/filters.component';
import { PublicacionesMultiplesComponent } from './publicaciones/publicaciones-multiples/publicaciones-multiples.component';
import { CarritoComponent } from './compras/carrito/carrito.component';
import { CheckoutComponent } from './compras/checkout/checkout.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ReseniasComponent } from './resenias/resenias.component';
import { SeguimientoComponent } from './compras/seguimiento/seguimiento.component';
import { NuevasPublicacionesComponent } from './publicaciones/nuevas-publicaciones/nuevas-publicaciones.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { AgendarAsesoriasComponent } from './asesorias/agendar-asesorias/agendar-asesorias.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { GoogleMapsModule } from '@angular/google-maps';


@NgModule({
  declarations: [
    AsesoriasComponent,
    CaracteristicasComponent,
    CategoriasComponent,
    ChatsComponent,
    CompradoresComponent,
    ComprasComponent,
    PagosComponent,
    ProductosComponent,
    RoleComponent,
    UsersComponent,
    EnviosComponent,
    MensajesComponent,
    OperacionesComponent,
    PublicacionesComponent,
    RepartidoresComponent,
    VendedoresComponent,
    ListarAsesoriasComponent,
    CreaeditaAsesoriasComponent,
    SignupCompradorComponent,
    SignupVendedorComponent,
    PublicacionesMultiplesComponent,
    CarritoComponent,
    CheckoutComponent,
    PerfilComponent,
    ReseniasComponent,
    SeguimientoComponent,
    NuevasPublicacionesComponent,
    AyudaComponent,
    AgendarAsesoriasComponent,
    ServiciosComponent,
    FiltersComponent

  ],
  imports:[
    CommonModule,
    ComponentsRoutingModule,
    MatListModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatTableModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatRadioModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatDividerModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatDialogModule,
    MatSliderModule,
    NgbRatingModule,
    MatSlideToggleModule,
    NgxPaginationModule,
    NgChartsModule,
    GoogleMapsModule
  ]
})
export class ComponentsModule { }
