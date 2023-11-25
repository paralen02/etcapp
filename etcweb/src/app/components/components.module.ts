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
import { ListarCaracteristicasComponent } from './caracteristicas/listar-caracteristicas/listar-caracteristicas.component';
import { CreaeditaCaracteristicasComponent } from './caracteristicas/creaedita-caracteristicas/creaedita-caracteristicas.component';
import { ListarCategoriasComponent } from './categorias/listar-categorias/listar-categorias.component';
import { CreaeditaCategoriasComponent } from './categorias/creaedita-categorias/creaedita-categorias.component';
import { ListarChatsComponent } from './chats/listar-chats/listar-chats.component';
import { CreaeditaChatsComponent } from './chats/creaedita-chats/creaedita-chats.component';
import { ListarCompradoresComponent } from './compradores/listar-compradores/listar-compradores.component';
import { CreaeditaCompradoresComponent } from './compradores/creaedita-compradores/creaedita-compradores.component';
import { ListarComprasComponent } from './compras/listar-compras/listar-compras.component';
import { CreaeditaComprasComponent } from './compras/creaedita-compras/creaedita-compras.component';
import { ListarPagosComponent } from './pagos/listar-pagos/listar-pagos.component';
import { CreaeditaPagosComponent } from './pagos/creaedita-pagos/creaedita-pagos.component';
import { ListarProductosComponent } from './productos/listar-productos/listar-productos.component';
import { CreaeditaProductosComponent } from './productos/creaedita-productos/creaedita-productos.component';
import { ListarRoleComponent } from './role/listar-role/listar-role.component';
import { CreaeditaRoleComponent } from './role/creaedita-role/creaedita-role.component';
import { ListarUsersComponent } from './users/listar-users/listar-users.component';
import { CreaeditaUsersComponent } from './users/creaedita-users/creaedita-users.component';
import { EnviosComponent } from './envios/envios.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { OperacionesComponent } from './operaciones/operaciones.component';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { RepartidoresComponent } from './repartidores/repartidores.component';
import { VendedoresComponent } from './vendedores/vendedores.component';
import { CreaeditaEnviosComponent } from './envios/creaedita-envios/creaedita-envios.component';
import { ListarEnviosComponent } from './envios/listar-envios/listar-envios.component';
import { CreaeditaMensajesComponent } from './mensajes/creaedita-mensajes/creaedita-mensajes.component';
import { ListarMensajesComponent } from './mensajes/listar-mensajes/listar-mensajes.component';
import { CreaeditaOperacionesComponent } from './operaciones/creaedita-operaciones/creaedita-operaciones.component';
import { ListarOperacionesComponent } from './operaciones/listar-operaciones/listar-operaciones.component';
import { CreaeditaPublicacionesComponent } from './publicaciones/creaedita-publicaciones/creaedita-publicaciones.component';
import { ListarPublicacionesComponent } from './publicaciones/listar-publicaciones/listar-publicaciones.component';
import { CreaeditaRepartidoresComponent } from './repartidores/creaedita-repartidores/creaedita-repartidores.component';
import { ListarRepartidoresComponent } from './repartidores/listar-repartidores/listar-repartidores.component';
import { CreaeditaVendedoresComponent } from './vendedores/creaedita-vendedores/creaedita-vendedores.component';
import { ListarVendedoresComponent } from './vendedores/listar-vendedores/listar-vendedores.component';
import { SignupCompradorComponent } from './signup/signup-comprador/signup-comprador.component';
import { SignupVendedorComponent } from './signup/signup-vendedor/signup-vendedor.component';
import { FiltersComponent } from './filters/filters.component';
import { NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';
import { PublicacionesMultiplesComponent } from './publicaciones/publicaciones-multiples/publicaciones-multiples.component';
import { CarritoComponent } from './compras/carrito/carrito.component';
import { CheckoutComponent } from './compras/checkout/checkout.component';
import { PerfilComponent } from './perfil/perfil.component';

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
    ListarCaracteristicasComponent,
    CreaeditaCaracteristicasComponent,
    ListarCategoriasComponent,
    CreaeditaCategoriasComponent,
    ListarChatsComponent,
    CreaeditaChatsComponent,
    ListarCompradoresComponent,
    CreaeditaCompradoresComponent,
    ListarComprasComponent,
    CreaeditaComprasComponent,
    ListarPagosComponent,
    CreaeditaPagosComponent,
    ListarProductosComponent,
    CreaeditaProductosComponent,
    ListarRoleComponent,
    CreaeditaRoleComponent,
    ListarUsersComponent,
    CreaeditaUsersComponent,
    CreaeditaEnviosComponent,
    ListarEnviosComponent,
    CreaeditaMensajesComponent,
    ListarMensajesComponent,
    CreaeditaOperacionesComponent,
    ListarOperacionesComponent,
    CreaeditaPublicacionesComponent,
    ListarPublicacionesComponent,
    CreaeditaRepartidoresComponent,
    ListarRepartidoresComponent,
    CreaeditaVendedoresComponent,
    ListarVendedoresComponent,
    SignupCompradorComponent,
    SignupVendedorComponent,
    FiltersComponent,
    PublicacionesMultiplesComponent,
    CarritoComponent,
    CheckoutComponent,
    PerfilComponent

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
    NgbRatingModule
  ]
})
export class ComponentsModule { }
