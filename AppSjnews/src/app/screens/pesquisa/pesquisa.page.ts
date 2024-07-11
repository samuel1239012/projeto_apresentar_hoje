import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NoticiaService } from 'src/app/services/noticia.service';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.page.html',
  styleUrls: ['./pesquisa.page.scss'],
})
export class PesquisaPage implements OnInit {

  public noticia: any[] = [];
  public searchTerm: string = ''; // Inicializa searchTerm como uma string vazia

  constructor(
    private _router: Router,
    private _noticia: NoticiaService,
    private alertController: AlertController,
  ) {
    if (window.localStorage.getItem('autorizado') != 'true') {
      this.presentAlert('Ops!', 'Realize o login primeiro');
      this._router.navigate(['./login']);
      return;
    }
  }

  ngOnInit() {
    this.listarNoticias();
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['Ok'],
    });
    await alert.present();
  }

  listarNoticias(searchTerm?: string) {
    this.noticia = [];
    if (searchTerm) {
      this._noticia.searchNoticiaByName(searchTerm).subscribe((data: any) => {
        if (data['status'] == 'success') {
          this.noticia = data['noticia'];
        }
      });
    } else {
      this._noticia.getNoticia().subscribe((data: any) => {
        if (data['status'] == 'success' && data['noticia']) {
          this.noticia = data['noticia'];
        }
      });
    }
  }

  searchNoticias() {
    this.listarNoticias(this.searchTerm);
  }

  getNoticia(pk_id: number) {
    this._router.navigate(['home/ler/' + pk_id]);
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.listarNoticias();
      event.target.complete();
    }, 2000); // tempo em milisegundos
  }
}
