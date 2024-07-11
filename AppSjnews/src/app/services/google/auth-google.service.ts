import { Injectable, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

  declare var google: any;
 
@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {
  getLoggedInUser(): any {
    throw new Error('Method not implemented.');
  }

  private clientId: string = '82731604620-5ho70t319cqei6bnsc6c4ljekkv11f71.apps.googleusercontent.com'
 
  // private _router = inject(Router)
 
  constructor(
    private _router: Router
  ) { }
 
  intializedLogin() {
    google.accounts.id.initialize({
      client_id: this.clientId,
      callback: (res: any) =>{
        this.handleLogin(res);
      }
    });
 
    google.accounts.id.renderButton(
      document.getElementById("google-btn"), {
        theme: 'filled_blue',
        size: 'large',
        shape: 'rectangle',
        width: 20,
      }
    );
 
  }
 
 
  private decodeToken(token: string){
 
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64)); //JSON retorno // Atob decode e passar para o token o valor   
 
  }

  getlogeedInUser(){
    return JSON.parse(sessionStorage.getItem("loggedInUser")!);
  }
 
 private handleLogin(response: any){
  if(response){
   //Decode the token
   const payLoad = this.decodeToken(response.credential)
   //Store in Session
   sessionStorage.setItem("loggedInUser", JSON.stringify(payLoad))
   //Navigate to home/browse
   this._router.navigate(['./home/noticia'])
  //  ./home/noticia
 
 
  } 
}

  singOut(){
    // Clear session storage
    sessionStorage.removeItem("loggedInUser");
    //Perfom Google Sing-Out
    google.accounts.id.disableAutoSelect();
    google.accounts.id.prompt();
    const singOutLink = document.createElement("a");
    singOutLink.href = 'javascript:void(0)';
    singOutLink.onclick = () => {
      google.accounts.id.prompt();
    };
    singOutLink.click();
    // After sign-outerHeight, navigate to the home page
    this._router.navigate(['/']);
  }

}
 