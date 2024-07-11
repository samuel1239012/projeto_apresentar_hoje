import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RegisterService } from 'src/app/services/clientes/register.service';

@Component({
  selector: 'app-formsaccount',
  templateUrl: './formsaccount.component.html',
  styleUrls: ['./formsaccount.component.scss'],
})
export class FormsaccountComponent implements OnInit {
  public formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private registerService: RegisterService,
    private router: Router
  ) {
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required]],
      // cpf: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      whatsapp: [null, [Validators.required]]
    });
  }

  ngOnInit() {}

  onRegister() {
    if (this.formulario.valid) {
      this.registerService.postCliente(this.formulario.value).subscribe(
        (data: any) => {
          if (data.status === 'success') {
            this.presentAlert('Oba!', 'Seu cadastro foi realizado com sucesso');
            this.router.navigate(['login']);
          } else {
            this.presentAlert('Ops!', data.error);
          }
        },
        error => {
          this.presentAlert('Ops!', 'Erro ao realizar o cadastro.');
          
        }
      );
    } else {
      this.presentAlert('Ops!', 'Por favor, preencha corretamente o formulário.');
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Ok'],
    });

    await alert.present();
  }
}
