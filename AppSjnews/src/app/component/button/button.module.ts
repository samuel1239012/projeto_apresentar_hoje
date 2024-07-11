import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule, IonicModule],
  exports: [ButtonComponent],
  providers: [],
})
export class ButtonModule {}
