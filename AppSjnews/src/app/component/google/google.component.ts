import { Component, OnInit, inject } from '@angular/core';
import { AuthGoogleService } from 'src/app/services/google/auth-google.service';

// declare var google: any;

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.scss'],
})
export class GoogleComponent  implements OnInit {

  constructor(private authService: AuthGoogleService) { }

  ngOnInit() {
    this.authService.intializedLogin();
    }



}
