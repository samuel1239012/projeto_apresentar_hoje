import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

import { ButtonModule } from 'src/app/component/button/button.module';
import { Forms2Module } from 'src/app/component/forms2/forms2.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ButtonModule,
    Forms2Module,
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
