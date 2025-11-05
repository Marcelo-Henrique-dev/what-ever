import { Component, inject } from '@angular/core';
import { Player } from '../../../../models/player';
import { PlayerService } from '../../../../service/player.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { state } from '@angular/animations';

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

  constructor(){
    this.listPlayers();
  }

  listPlayers(){
    this.playerService.findAll().subscribe({
      next: (response) => {
        this.lista = response.data;
        this.isLoading = false;
        Swal.fire({
          title: "Players Carregados",
          icon: "success",
          confirmButtonText: "Ok"
        })
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

}
