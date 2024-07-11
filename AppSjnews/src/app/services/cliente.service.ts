import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private url = 'https://g1a.com.br/jornal/api_jornal/clientes'
  private favoritosUrl= 'https://g1a.com.br/jornal/api_jornal/favoritos';

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<[Cliente]>(this.url);
  }

  addToFavorites(cliente: Cliente) {
    return this.http.post(this.favoritosUrl, cliente);
  }

}

export interface Cliente{
  id: string;
  nome: string;
  email: string;
}
