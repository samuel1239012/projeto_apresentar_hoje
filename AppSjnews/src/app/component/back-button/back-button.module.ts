import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { CommonModule } from '@angular/common';
import { BackButtonComponent } from './back-button.component';

@NgModule({
  declarations: [BackButtonComponent],
  imports: [CommonModule, IonicModule],
  exports: [BackButtonComponent],
  providers: [],
})
export class BackButtonModule {
    
}
