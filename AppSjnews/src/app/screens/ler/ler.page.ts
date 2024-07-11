import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Cliente, ClienteService } from 'src/app/services/cliente.service';
import { FavoritosService } from 'src/app/services/favoritos/favoritos.service';
import { NoticiaService } from 'src/app/services/noticia.service';

@Component({
  selector: 'app-ler',
  templateUrl: './ler.page.html',
  styleUrls: ['./ler.page.scss'],
})
export class LerPage implements OnInit {

  clientes: Cliente[];

  private _pk_noticia: number = 0;
  private _pk_clientes: any;
  // Variável para armazenar informações da notícia
  public titulo: string = "";
  public sub_titulo: string = "";
  public texto: string = "";
  public img: string = "";
  public palavra_chave: string = "";
  public pk_favorito: number = 0;

  private favoritado : boolean = false;

  private noticia: string;

  public pk_id: number = 0;


  item: string[] = [];

  constructor(
    private _router: Router,
    public alertController: AlertController,
    private _activatedRoute: ActivatedRoute,
    private _noticia: NoticiaService,
    private _favoritosService: FavoritosService,
    private http: HttpClient,
    private service: ClienteService
  ) { 
    
    // if (window.localStorage.getItem('autorizado') !== 'true') {
    //   this.presentAlert('Ops!', 'Realize o login primeiro');
    //   this._router.navigate(['./login']);
    //   return;
    // }

    // PEGAR OS PARAMETROS ENVIADOS NA ROTA
    this._activatedRoute.params.subscribe((data: any) => {
      this._pk_noticia = +data['id']; // Ensure the id is a number by using the + operator
      if (this._pk_noticia) {
        this.getNoticias(this._pk_noticia);
      } else {
        this.presentAlert('Erro', 'ID de notícia inválido.');
        this._router.navigate(['./home']);
      }
    });

    this._pk_clientes = window.localStorage.getItem('pk_cliente')
  }

  getNoticias(pk_noticia: number) {
    this._noticia.getNoticias(pk_noticia).subscribe((data: any) => {
      if (data['status'] === 'success') {
        this.titulo = data['noticia']['titulo'];
        this.sub_titulo = data['noticia']['sub_titulo'];
        this.texto = data['noticia']['texto'];
        this.img = data['noticia']['imagem'];
        this.palavra_chave = data['noticia']['palavra_chave'];
        this.pk_favorito = data['noticia']['pk_favorito'];
      } else {
        this.presentAlert('Ops!', 'Notícia não encontrada.');
        this._router.navigate(['./home']);
      }
    }, (error) => {
      console.error('Erro ao buscar notícia:', error);
      this.presentAlert('Erro', 'Não foi possível carregar a notícia.');
      this._router.navigate(['./home']);
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

  // onSave(){

  // } 

  addFavoritos() {
    this._favoritosService.addFavorite(this._pk_clientes, this._pk_noticia)
      .subscribe((data: any) => {
        if (data['status'] === 'success') {
          this.presentAlert('Sucesso!', 'Notícia adicionada aos favoritos.');
        } else {
          this.presentAlert('Ops!', 'Erro ao adicionar a notícia aos favoritos.');
          console.error('Erro ao adicionar favorito:', data);
        }
      }, (error) => {
        console.error('Erro ao adicionar favorito:', error);
        this.presentAlert('Erro', 'Não foi possível adicionar a notícia aos favoritos.');
      });
  }

  removeFavorite(pk_id: number) {
    this._favoritosService.removeFavorite(pk_id).subscribe(
      (data: any) => {
        if (data.status === 'success') {
          // Atualiza a lista de favoritos após remover
          // this.getFavorites();
          // jose = true;
        } else {
          console.error('Erro ao remover favorito: ', data.error);
        }
      },
      (error) => {
        console.error('Erro ao remover favorito: ', error);
      }
    );
  }


  toggleFavorito(pk_id:number) {
    this.favoritado = !this.favoritado; // Alterna o estado de favorito

    if (this.favoritado) {
      this.addFavoritos(); // Chama a função para adicionar aos favoritos
    } else {
      this.removeFavorite(pk_id); // Chama a função para remover dos favoritos
    }
  }

  ngOnInit() {
    // The API call is now made within the route parameter subscription
    
  }
}