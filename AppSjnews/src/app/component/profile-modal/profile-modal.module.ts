import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileModalComponent } from './profile-modal.component';

@NgModule({
  declarations: [ProfileModalComponent],
  imports: [CommonModule, IonicModule,FormsModule, ReactiveFormsModule,],
  exports: [ProfileModalComponent],
  providers: [],
})
export class ProfileModalModule {}
