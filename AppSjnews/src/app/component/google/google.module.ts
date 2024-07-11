import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleComponent } from './google.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [GoogleComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [GoogleComponent],
  providers: [],
})
export class GoogleModule { }
