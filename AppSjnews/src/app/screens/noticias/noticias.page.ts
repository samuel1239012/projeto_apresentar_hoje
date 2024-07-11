import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NoticiaService } from 'src/app/services/noticia.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {
  private _fk_genero: number = 0
  // Variavel para armanezar informações da noticia
  public titulo: string = ""
  public sub_titulo: string = ""
  public img: string = ""
  public texto: string = ""
  public palavra_chave: string = ""

  noticias: any[] = [];
  genero: any[] = [];

  constructor(
    private _router: Router,
    public alertController: AlertController,
    private _activatedRoute: ActivatedRoute,
    private _noticia: NoticiaService
  ) { 
    
    // if (window.localStorage.getItem('autorizado') != 'true') {
    //   this.presentAlert('Ops!', 'Realize o login primeiro')
    //   this._router.navigate(['./login'])
    //   return
    // }

    //PEGAR OS PARAMETROS ENVIADOS NA ROTA
    this._activatedRoute.params.subscribe((data: any)=>{
      this._fk_genero = data['id']
    })


  }

  getNoticia(fk_genero: number) {
    this._noticia.searchNoticiaByGenero(fk_genero).subscribe((data: any) => {
        if (data.status === 'success') {
            this.genero = [];
            data.noticia.forEach((element: any) => {
                this.genero.push(element);
            });
        } else {
            this.presentAlert('Ops!', 'Notícia não encontrada.');
            this._router.navigate(['./home']);
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

  getNoticias(pk_id: number) {
    this._router.navigate(['home/ler/' + pk_id]);
  }


  ngOnInit() {
    this.getNoticia(this._fk_genero)
  }

}