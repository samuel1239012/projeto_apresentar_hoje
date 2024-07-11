import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RegisterService } from 'src/app/services/clientes/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage  {

  public formulario: FormGroup = this.formBuilder.group({

    nome: [null, [Validators.required]],
    // cpf: [null, [Validators.required,Validators.minLength(14), Validators.maxLength(14)]],
    senha: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    whatsapp: [null, [Validators.required]]

  })
  alertController: any;
  constructor(
    public formBuilder: FormBuilder,
    public alert2Controller: AlertController,
    private _register: RegisterService,
    private _router: Router,

  ) { }

  onRegister() {
    if (this.formulario.valid) {
      //seguir Com CADASTRO DO CLIENTE
      this._register.postCliente(this.formulario.value).subscribe((data: any) => {
        if (data['status'] == 'success') {
          this.presentAlert('Oba!', 'Seu cadastro foi realizado com sucesso')
        } else {
          this.presentAlert('Ops!', data['error'])
        }
        this._router.navigate(['login']);
      }
      )
    } else {
      // SOLICITAR PREENCHIMENTO DE CAMPOS
      this.presentAlert('Ops!', 'Por favor, preencha corretamente o formulário.')
    }

  }


  async presentAlert(header: string, message: string) {
    const alert = await this.alert2Controller.create({
      header: header,
      message: message,
      buttons: ['Ok'],
    });

    await alert.present();
  }

}

