import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private favorites: Set<string> = new Set();

  private _url: string = "http://localhost/api_jornal/favoritos/";
// "https://g1a.com.br/jornal/api_jornal/favoritos/"
  private _httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'f6a95880e88e'
    })
  };

  constructor(
    private _httpClient: HttpClient
  ) { }

  addFavorite(pk_clientes: number, pk_noticia: number) {
    const body = { pk_clientes, pk_noticia };
    return this._httpClient.post(this._url, body, this._httpOptions);
  }

  removeFavorite(pk_id: number) {
    return this._httpClient.delete(this._url + '?id=' + pk_id, this._httpOptions);
  }

  getFavorites(pk_clientes: number) {
    return this._httpClient.get(this._url + '?pk_clientes=' + pk_clientes, this._httpOptions);
  }

  isFavorite(item: string): boolean {
    return this.favorites.has(item);
  }

  setFavorites(item: string[]) {
    this.favorites = new Set(item);
  }

  getLocalFavorites(): string[] {
    return Array.from(this.favorites);
  }

  // getFavoritos(): Observable <any[]> {
  //   return this._httpClient.get<any[]>(this._url);
  // }

  // addFavorito(clienteId: string): Observable<any[]> {
  //   return this._httpClient.post<any>(`${this._url}`, { id: clienteId });
  // }

  // removeFavorito(favoritoId: string): Observable<any> {
  //   return this._httpClient.delete<any>(`${this._url}?id=${favoritoId}`);
  // }


}
