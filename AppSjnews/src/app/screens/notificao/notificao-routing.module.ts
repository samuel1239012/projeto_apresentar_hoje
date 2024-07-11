import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificaoPage } from './notificao.page';

const routes: Routes = [
  {
    path: '',
    component: NotificaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificaoPageRoutingModule {}
