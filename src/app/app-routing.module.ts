import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameFlowComponent } from './components/game-flow/game-flow.component';
import { MapSetupComponent } from './components/map-setup/map-setup.component';

const routes: Routes = [
  {path: 'mapSetup', component: MapSetupComponent},
  {path: 'gameFlow', component: GameFlowComponent},
  {path: "", component: MapSetupComponent},
  {path: '', component: MapSetupComponent},
  {path: '**', component: MapSetupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
