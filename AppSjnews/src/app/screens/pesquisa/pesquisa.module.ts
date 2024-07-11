import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PesquisaPageRoutingModule } from './pesquisa-routing.module';

import { PesquisaPage } from './pesquisa.page';
import { BackButtonModule } from 'src/app/component/back-button/back-button.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PesquisaPageRoutingModule,
    BackButtonModule
  ],
  declarations: [PesquisaPage]
})
export class PesquisaPageModule {}
