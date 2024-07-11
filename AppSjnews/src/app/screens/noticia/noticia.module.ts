import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoticiaPageRoutingModule } from './noticia-routing.module';

import { NoticiaPage } from './noticia.page';
import { GenerosModule } from "../../component/generos/generos.module";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GoogleModule } from 'src/app/component/google/google.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoticiaPageRoutingModule,
    GenerosModule,
    
  ],
  declarations: [NoticiaPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NoticiaPageModule {}
