import { Component, inject, Input, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Player } from '../../../../models/player';
import Swal from 'sweetalert2';
import { PlayerService } from '../../../../service/player.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-playerdetails',
  imports: [FormsModule],
  templateUrl: './playerdetails.component.html',
  styleUrl: './playerdetails.component.css'
})
export class PlayerdetailsComponent {

  @Input('player') player:Player = new Player(0, '', 0, 0);
  playerService = inject(PlayerService)
  router = inject(Router)
  route = inject(ActivatedRoute)

  constructor(){
    let id = this.route.snapshot.params['id'];
    if(id>0){
      this.findById(id);
    }
  }

  save(){
    if(this.player.id > 0){
      this.playerService.update(this.player, this.player.id).subscribe({
        next: (response) => {
          this.router.navigate(["/lista-jogadores"])
        },
        error: (error) => {
          Swal.fire({
            title: "Erro ao editar Jogador",
            text: error,
            icon: "error",
            confirmButtonText: "Ok"
          })
        }
      })
    }else{
      this.playerService.save(this.player).subscribe({
        next: (mensagem) =>{
          Swal.fire({
            title: mensagem.message,
            icon: "success",
            confirmButtonText: "Ok"
          });
          this.router.navigate(["/lista-jogadores"])
        },
        error: (error) =>{
          Swal.fire({
            title: "Erro ao salvar Player",
            text: error,
            icon: "error",
            confirmButtonText: "Ok"
          })
        }
      })
    }
  }

  findById(id:number){
    this.playerService.findById(id).subscribe({
      next: (response) => {
        this.player = response.data;
      },
      error: (error) => {
        Swal.fire({
          title: "Erro ao carregar Player",
          text: error,
          icon: "error",
          confirmButtonText: "Ok"
        })
      }
    })
  }
}
