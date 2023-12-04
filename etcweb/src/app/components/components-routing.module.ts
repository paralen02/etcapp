import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsesoriasComponent } from './asesorias/asesorias.component';
import { CreaeditaAsesoriasComponent } from './asesorias/creaedita-asesorias/creaedita-asesorias.component';
import { AgendarAsesoriasComponent } from './asesorias/agendar-asesorias/agendar-asesorias.component';

const routes: Routes = [
  // For each entity, you must create a path that will be used to navigate to the related components
  {
    path: 'asesorias',
    component: AsesoriasComponent,
    children: [
      { path: 'nuevo', component: CreaeditaAsesoriasComponent },
      { path: 'ediciones/:id', component: CreaeditaAsesoriasComponent },
      { path: 'agendar/:id', component: AgendarAsesoriasComponent }
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
