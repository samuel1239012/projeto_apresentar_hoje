import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
 
@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss'],
})
export class ProfileModalComponent implements OnInit {
 
  public formulario: FormGroup = this.formBuilder.group({
    id: [window.localStorage.getItem('pk_cliente'), [Validators.required]],
    nome: [null, [Validators.required]],
    cpf: [null, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
    senha: [null, [Validators.minLength(4), Validators.maxLength(10)]],
    email: [null, [Validators.required, Validators.email]],
    whatsapp: [null, [Validators.required]],
    imagem: [null]
  });
 
  public imgBase64: string = '';
 
  constructor(
    private modalController: ModalController,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    private _router: Router,
    private _clientes: ClientesService
  ) {
    this._clientes.getCliente(this.formulario.controls['id'].value)
      .subscribe((data: any) => {
        if (data['status'] === 'success') {
          this.formulario.patchValue({
            nome: data['clientes']['nome'],
            cpf: data['clientes']['cpf'],
            email: data['clientes']['email'],
            whatsapp: data['clientes']['whatsapp'],
            imagem: data['clientes']['imagem'],
          });
          this.imgBase64 = data['clientes']['imagem'];
        } else {
          this.presentAlert('Ops!', data['error']);
        }
      });
  }
 
  ngOnInit() {}
 
  onFileChange(event: any) {
    const reader = new FileReader();
 
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
 
      reader.onload = () => {
        this.formulario.patchValue({
          imagem: reader.result
        });
        this.imgBase64 = reader.result as string;
      };
    }
  }
 
  onSave() {
    this._clientes.putCliente(this.formulario.value)
      .subscribe((data: any) => {
        if (data['status'] === 'success') {
          this.presentAlert('Oba!', 'Registro salvo com sucesso.');
          this.dismiss();
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
 
  dismiss() {
    this.modalController.dismiss();
  }
 
  onLogout() {
    window.localStorage.clear();
    this.modalController.dismiss();
    this._router.navigate(['/login']);
  }
}