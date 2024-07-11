import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenerosService } from 'src/app/services/generos/generos.service';

@Component({
  selector: 'app-generos',
  templateUrl: './generos.component.html',
  styleUrls: ['./generos.component.scss'],
})
export class GenerosComponent {

  buttons: any[] = [];
  activeButton = 'Home';
  // Automobilismo

  constructor(private router: Router,
    private _generosService: GenerosService
  ) {
    this.getGeneros()
   }
  
  setActiveButton(button: string) {

    this.activeButton = button;
      this.router.navigate(['/noticias/' + button]);
  }

  getGeneros() {
    this.buttons = []
    this._generosService.getGeneros().subscribe((data: any) => {
      if (data['status'] == 'success') {
        data['generos'].forEach((element: any) => {
          this.buttons.push(element)
        });
      }
    })
  }


}
