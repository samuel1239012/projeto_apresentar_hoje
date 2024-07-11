import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _url: string="https://g1a.com.br/jornal/api_jornal/clientes/";
  
  private _httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
    'Authorization': 'f6a95880e88e'
  })
};


  constructor(
    private _httpClient: HttpClient
  ) { }

  getLogin(email: string, password: string){
  //CONSTRÓI O CAMINHO FINAL = localhost+ parametros


    const endpoint = this._url + "?email=" + email + "&senha=" + btoa(password)
  //RETORNA OS DADOS DA API_BACK
    return this._httpClient.get(endpoint, this._httpOptions)
  }

}
