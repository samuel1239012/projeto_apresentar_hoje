import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  private _url: string = "https://g1a.com.br/jornal/api_jornal/noticia/";

  private _httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'f6a95880e88e'
    })
  };

  constructor(private http: HttpClient) { }

  getGeneroAutomobilismo(): Observable<any> {
    return this.http.get<any[]>(`${this._url}generos`, this._httpOptions).pipe(
      map((generos: any[]) => {
        console.log('Dados recebidos do servidor:', generos);
        return generos.filter(genero => genero.nome === 'automobilismo');
      })
    );
  }
}
