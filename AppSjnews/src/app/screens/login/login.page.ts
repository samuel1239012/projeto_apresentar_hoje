import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { LoginService } from 'src/app/services/clientes/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

 
  public formulario: FormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]]
  })


  constructor(
    private navCtrl: NavController,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    private _loginService: LoginService,
    private router: Router
  ) {


    this.navCtrl = navCtrl;
    window.localStorage.clear();

  }

  showRegister() {
    this.navCtrl.navigateBack('register');
  }

  onLogin() {
    if (this.formulario.valid == false) {
      this.presentAlert('Ops!', 'Preencha todos os campo obrigatórios!')
    } else {
      this._loginService.getLogin(
        this.formulario.controls["email"].value,
        this.formulario.controls["password"].value,
      ).subscribe((data: any) => {
        if(data["status"] == "success"){
          // criar um item no LocalStorage
          window.localStorage.setItem('autorizado', 'true');
          window.localStorage.setItem('nome_cliente',data["clientes"]["nome"] )
          window.localStorage.setItem('pk_cliente',data["clientes"]["pk_id"] )

          this.presentAlert("Bem-Vindo!", data["clientes"]["nome"]+ ", login realizado com sucesso!")
          this.router.navigate(['/home']);

        } else{
          this.presentAlert("Ops!", data["error"])
        }
      })
    }
  }


  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Ok'],
    });

    await alert.present();
  }

  goToHome(){
   
  }
}
