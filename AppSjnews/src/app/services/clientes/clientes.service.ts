import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
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

  getCliente(pk_cliente: any){
  //CONSTRÓI O CAMINHO FINAL = localhost+ parametros
    const endpoint = this._url + '?id=' + pk_cliente
  //RETORNA OS DADOS DA API_BACK
  // JSON.Stringify = transforma o formulario HTML em JSOn
    return this._httpClient.get(endpoint, this._httpOptions)
  }

  putCliente(form:any){
    //CONSTRÓI O CAMINHO FINAL = localhost+ parametros
    const endpoint = this._url
  //RETORNA OS DADOS DA API_BACK
  // JSON.Stringify = transforma o formulario HTML em JSOn
    return this._httpClient.put(endpoint, JSON.stringify(form), this._httpOptions)

  }

 
}
