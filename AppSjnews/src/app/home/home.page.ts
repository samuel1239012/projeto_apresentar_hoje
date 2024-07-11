import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ProfileModalComponent } from '../component/profile-modal/profile-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '../services/clientes/clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public formulario: FormGroup = this.formBuilder.group({
    id: [window.localStorage.getItem('pk_cliente'), [Validators.required]],
    imagem: [null]

  })

  constructor(
    private modalController: ModalController,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    private _router: Router,
    private _clientes: ClientesService

  
  ) {
    this._clientes.getCliente(this.formulario.controls['id'].value)
    .subscribe((data: any) =>{
      if (data['status'] == 'success') {
        this.formulario.patchValue({
          imagem: data['clientes']['imagem']
        });
      } else {
        this.presentAlert('Ops!', data['error']);
      }
    });
  }


  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Ok'],
    });
    await alert.present();
  }

  async openProfileModal() {
    const modal = await this.modalController.create({
      component: ProfileModalComponent,
      cssClass: 'profile-modal'
    });
    return await modal.present();
  }
}