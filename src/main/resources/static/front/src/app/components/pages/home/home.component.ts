import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  router = inject(Router);
  players: string[] = [];

  constructor(){
    this.players.push("jdklasf")
  }

  jogar(){
    if(this.players.length<=0){
      this.router.navigate(["register-player"]);
    }else{
      this.router.navigate(["lista-jogadores"])
    }
  }

}
