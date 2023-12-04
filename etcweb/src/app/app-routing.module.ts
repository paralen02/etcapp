import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { SignupCompradorComponent } from './components/signup/signup-comprador/signup-comprador.component';
import { PublicacionesComponent } from './components/publicaciones/publicaciones.component';
import { PublicacionesMultiplesComponent } from './components/publicaciones/publicaciones-multiples/publicaciones-multiples.component';
import { CarritoComponent } from './components/compras/carrito/carrito.component';
import { CheckoutComponent } from './components/compras/checkout/checkout.component';
import { ComprasComponent } from './components/compras/compras.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AgendarAsesoriasComponent } from './components/asesorias/agendar-asesorias/agendar-asesorias.component';
import { SeguimientoComponent } from './components/compras/seguimiento/seguimiento.component';
import { ReseniasComponent } from './components/resenias/resenias.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { ChatsComponent } from './components/chats/chats.component';
import { AyudaComponent } from './components/ayuda/ayuda.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'signup', redirectTo: '/signup-comprador' },
  { path: 'signup-comprador', component: SignupCompradorComponent },
  { path: 'publicaciones/:id', component: PublicacionesComponent },
  { path: 'conjugaciones/:ids', component: PublicacionesMultiplesComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'compras', component: ComprasComponent },
  { path: 'perfil', component: PerfilComponent},
  { path: 'asesorias/:id', component: AgendarAsesoriasComponent},
  { path: 'seguimiento/:id', component: SeguimientoComponent },
  { path: 'resenias/:id', component: ReseniasComponent },
  { path: 'servicios/:id', component: ServiciosComponent },
  { path: 'chats/:id', component: ChatsComponent },
  { path: 'ayuda', component: AyudaComponent },
  {
    path: 'components',
    loadChildren: () =>
      import('./components/components.module').then((m) => m.ComponentsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
