import { Component, OnInit } from '@angular/core';
import { AuthGoogleService } from 'src/app/services/google/auth-google.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  constructor(
    private authService: AuthGoogleService
  ) {
    
   }

  ngOnInit() {
    this.authService.intializedLogin();
  }

}
