import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  private _url: string="https://g1a.com.br/jornal/api_jornal/noticia/";
  
  private _httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
    'Authorization': 'f6a95880e88e'
  })
};
    
  



  constructor(
    private _httpClient: HttpClient
  ) { }

  getNoticias(pk_noticia: number){
    //CONSTRÓI O CAMINHO FINAL = localhost+ parametros
      const endpoint = this._url + '?id=' + pk_noticia + '&fk_cliente=' + window.localStorage.getItem('pk_cliente')
    //RETORNA OS DADOS DA API_BACK
      return this._httpClient.get(endpoint, this._httpOptions)
    }

  getNoticia(){
  //CONSTRÓI O CAMINHO FINAL = localhost+ parametros
    const endpoint = this._url
  //RETORNA OS DADOS DA API_BACK
    return this._httpClient.get(endpoint, this._httpOptions)
  }

  searchNoticiaByName(nome: string) {
    const endpoint = this._url + '?search=' + nome;
    return this._httpClient.get(endpoint, this._httpOptions);
  }

  searchNoticiaByGenero(pk_genero: number) {
    const endpoint = this._url + '?fk_genero=' + pk_genero;
    return this._httpClient.get(endpoint, this._httpOptions);
  }
  
  // getGeneroAutomobilismo(pk_genero: number): Observable<any> {
  //   const endpoint = this._url + '?fk_genero=' + pk_genero;
  //   return this._httpClient.get(endpoint, this._httpOptions).pipe(
  //     map((pk_genero: any[]) => {
  //       console.log('Dados recebidos do servidor:', generos);
  //       return generos.filter(genero => genero.nome === 'automobilismo');
  //     })
  //   );
  // }
}
