import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LerPageRoutingModule } from './ler-routing.module';

import { LerPage } from './ler.page';

import { BackButtonModule } from 'src/app/component/back-button/back-button.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LerPageRoutingModule,
    BackButtonModule,
  ],
  declarations: [LerPage]
})
export class LerPageModule {}
