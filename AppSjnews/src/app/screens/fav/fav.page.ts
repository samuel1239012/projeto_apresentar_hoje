import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ClienteService } from 'src/app/services/cliente.service';
import { FavoritosService } from 'src/app/services/favoritos/favoritos.service';
import { NoticiaService } from 'src/app/services/noticia.service';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.page.html',
  styleUrls: ['./fav.page.scss'],
})
export class FavPage implements OnInit {

  public favoriteItems: any[] = [];
  private _pk_clientes: any;

  public pk_id: number = 0;

  noticias: any[] = [];

  constructor(
    private _favoritosService: FavoritosService,
    private _router: Router,
    public alertController: AlertController,
    private _noticia: NoticiaService,
    private http: HttpClient,
    private service: ClienteService
  ) {
    this._pk_clientes = window.localStorage.getItem('pk_cliente');
  }

  ngOnInit() {
    this.getFavorites();
  }

  // getFavorites() {
  //   if (this._pk_clientes) {
  //     this._favoritosService.getFavorites(this._pk_clientes).subscribe(
  //       (data: any) => {
  //         if (data['status'] === 'success') {
  //           this.favoriteItems = data['favoritos'];
  //           this.loadFavoriteNoticias();
  //         } else {
  //           console.error('Erro ao buscar favoritos: ', data['message']);
  //         }
  //       },
  //       (error) => {
  //         console.error('Erro ao buscar favoritos: ', error);
  //       }
  //     );
  //   } else {
  //     console.error('Cliente não encontrado');
  //   }
  // }


  getFavorites() {
    if (this._pk_clientes) {
      this.favoriteItems = []
      this._favoritosService.getFavorites(this._pk_clientes).subscribe(
        (data: any) => {
          // console.log('Resposta da API:', data); // Verifica o que a API está retornando
          if (data.status === 'success') {
            data['favoritos'].forEach((element: any) => {
              this.favoriteItems.push(element)
            });
          } else {
            this.presentAlert('Erro', data.message);
          }
        },
        (error) => {
          console.error('Erro ao buscar favoritos:', error); // Verifica erros de requisição
          this.presentAlert('Erro', 'Erro ao buscar favoritos');
        }
      );
    } else {
      console.error('Cliente não encontrado');
      this.presentAlert('Erro', 'Cliente não encontrado');
    }
  }

  


  loadFavoriteNoticias() {
    this.favoriteItems.forEach((item: any) => {
      this.getNoticia(item.fk_genero); // Assumindo que 'fk_genero' está em cada item favorito
    });
  }

  getNoticia(fk_genero: number) {
    this._noticia.searchNoticiaByGenero(fk_genero).subscribe((data: any) => {
      if (data.status === 'success') {
        this.noticias.push(...data.noticia); // Adiciona as notícias ao array
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

  removeFavorite(pk_id: number) {
    this._favoritosService.removeFavorite(pk_id).subscribe(
      (data: any) => {
        if (data.status === 'success') {
          // Atualiza a lista de favoritos após remover
          this.getFavorites();
        } else {
          console.error('Erro ao remover favorito: ', data.error);
        }
      },
      (error) => {
        console.error('Erro ao remover favorito: ', error);
      }
    );
  }
}