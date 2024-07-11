import { Component, OnInit } from '@angular/core';
import { AuthGoogleService } from 'src/app/services/google/auth-google.service';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss'],
})
export class TesteComponent  implements OnInit {

  user: any

  email=JSON.parse(sessionStorage.getItem("loggedInUseer")!).email

  constructor(private authService: AuthGoogleService) { }

  ngOnInit() {
    this.user = this.authService.getlogeedInUser();
  }

  
}
