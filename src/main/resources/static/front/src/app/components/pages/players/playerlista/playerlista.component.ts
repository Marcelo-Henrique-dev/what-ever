import { Component, inject } from '@angular/core';
import { Player } from '../../../../models/player';
import { PlayerService } from '../../../../service/player.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playerlista',
  imports: [],
  templateUrl: './playerlista.component.html',
  styleUrl: './playerlista.component.css'
})
export class PlayerlistaComponent {

  lista: Player[] = [];
  playerService = inject(PlayerService);
  isLoading: boolean = true;
  playerSelecionado: Player = new Player(0, '', 0, 0);
  router = inject(Router)
  page: number = 0;
  size: number = 9;
  firstLoad: boolean = true;
  pages: number[] = [];
  pageNumber!:number;

  constructor(){
    this.listPlayers();
  }

  listPlayers(){
    this.playerService.findAll(this.page, this.size).subscribe({
      next: (response) => {
        this.lista = response.content;
        this.pageNumber = response.number;
        for(let i=0; i<response.totalPages; i++){
          this.pages.push(i); 
        }
        this.isLoading = false;
        if(this.page == 0 && this.firstLoad){
          Swal.fire({
            title: "Players Carregados",
            icon: "success",
            confirmButtonText: "Ok"
          })
        }
      },
      error: (error) => {
        Swal.fire({
          title: "Erro ao carregar Players",
          text: error,
          icon: "error",
          confirmButtonText: "Ok"
        })
      }
    });
  }

  editar(player: Player){
    this.router.navigate(["/register-player", player.id]);
  }

  avancarPagina(){
    this.page++;
    this.listPlayers();
    this.firstLoad = false;
  }
  
  voltarPagina(){
    this.page--;
    this.listPlayers();
  }

}
