import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { CommonModule } from '@angular/common';

import { FormsaccountComponent } from './formsaccount.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FormsaccountComponent],
  imports: [CommonModule, IonicModule,FormsModule, ReactiveFormsModule],
  exports: [FormsaccountComponent],
  providers: [],
})
export class FormsAccountModule {}
