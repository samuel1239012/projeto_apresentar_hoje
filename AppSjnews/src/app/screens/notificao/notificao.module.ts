import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificaoPageRoutingModule } from './notificao-routing.module';

import { NotificaoPage } from './notificao.page';
import { BackButtonModule } from 'src/app/component/back-button/back-button.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificaoPageRoutingModule,
    BackButtonModule
  ],
  declarations: [NotificaoPage]
})
export class NotificaoPageModule {}
