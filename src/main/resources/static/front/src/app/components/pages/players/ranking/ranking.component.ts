import { Component, inject } from '@angular/core';
import { Player } from '../../../../models/player';
import { PlayerService } from '../../../../service/player.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ranking',
  imports: [],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent {

  playersRank: Player[] = [];

  playerService = inject(PlayerService)

  constructor(){
    this.listarPlayers();
  }

  listarPlayers(){
    this.playerService.findAllRank().subscribe({
      next: (response) =>{
        const allPlayersSorted = this.gerarRankQuickSort(response.data);
        this.playersRank = allPlayersSorted.slice(0,10);
      },
      error: (error) => {
        Swal.fire({
          title: "Erro ao gerar o rank",
          text: error,
          icon: "error",
          confirmButtonText: "Ok"
        })
      }
    });
  }

  private gerarRankQuickSort(players: Player[]): Player[]{
    if(players.length<=1){
      return players;
    }
    const pivot = players[0];
    const greater: Player[] = [];
    const lesser: Player[] = [];
    for(let i=1; i<players.length; i++){ 
      if(players[i].pontuacao > pivot.pontuacao){
        greater.push(players[i]);
      } else {
        lesser.push(players[i]);
      }
    }
    return [
      ...this.gerarRankQuickSort(greater),
      pivot,
      ...this.gerarRankQuickSort(lesser)
    ];
}

}
