import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { SignupCompradorComponent } from './components/signup/signup-comprador/signup-comprador.component';
import { PublicacionesComponent } from './components/publicaciones/publicaciones.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent, pathMatch: 'full'},
  { path: 'signup', redirectTo: '/signup-comprador'},
  { path: 'signup-comprador', component: SignupCompradorComponent },
  { path: 'publicaciones/:id', component: PublicacionesComponent },
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
