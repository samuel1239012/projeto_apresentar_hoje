import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { CommonModule } from '@angular/common';

import { Forms2Component } from './forms2.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleModule } from '../google/google.module';

@NgModule({
  declarations: [Forms2Component],
  imports: [CommonModule, IonicModule,FormsModule, ReactiveFormsModule, GoogleModule],
  exports: [Forms2Component],
  providers: [],
})
export class Forms2Module {}
