import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { GenerosService } from 'src/app/services/generos/generos.service';
import { NoticiaService } from 'src/app/services/noticia.service';




@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.page.html',
  styleUrls: ['./noticia.page.scss'],
})
export class NoticiaPage implements OnInit {

  buttons: any[] = [];
  activeButton = 'Home';
  
  buttonId: any[] = [];
  ActiveButton: number;

  public noticia: any[] = [];
  public searchTerm: string = ''; // Inicializa searchTerm como uma string vazia
 
  public nome_cliente  = window.localStorage.getItem("nome_cliente")

  onLogout(){
    window.localStorage.clear()
    this._router.navigate(['/login'])
  }


  constructor(
    private _router: Router,
    private _noticia: NoticiaService,
    private alertController: AlertController,
    private _generosService: GenerosService,

    
  ) {
    // if (window.localStorage.getItem('autorizado') != 'true') {
    //   this.presentAlert('Ops!', 'Realize o login primeiro');
    //   this._router.navigate(['./login']);
    //   return;
    // }
  }

  ngOnInit() {
    this.listarNoticias();
    this.getGeneros();

    this._generosService.getGeneroAutomobilismo().subscribe(
      data => {
        console.log('Dados filtrados:', data);
        this.buttons = data;
      },
      error => {
        console.error('Erro ao buscar dados:', error);
      }
    );
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

  setActiveButton(button: string) {

    this.activeButton = button;
      this._router.navigate(['/noticias/' + button]);
  }


  getGeneros() {
    this.buttons = []
    this._generosService.getGeneros().subscribe((data: any) => {
      if (data['status'] == 'success') {
        data['generos'].forEach((element: any) => {
          this.buttons.push(element)
        });
      }
    })
  }
 

}


