import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenerosComponent } from './generos.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [GenerosComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ],
  exports: [GenerosComponent],
  providers: [],
})
export class GenerosModule {}



