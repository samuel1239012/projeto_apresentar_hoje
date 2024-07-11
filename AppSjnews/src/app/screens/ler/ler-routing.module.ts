import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LerPage } from './ler.page';

const routes: Routes = [
  {
    path: '',
    component: LerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LerPageRoutingModule {}
