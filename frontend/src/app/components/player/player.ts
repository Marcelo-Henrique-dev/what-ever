import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Player as PlayerModel } from '../../models/player.model';
import { PlayerService } from '../../services/player';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-player',
  imports: [FormsModule, CommonModule],
  templateUrl: './player.html',
  styleUrl: './player.scss',
})
export class PlayerComponent implements OnInit {
  player: PlayerModel = {
    nome: '',
    partidas: 0,
    pontuacao: 0
  };
  
  players: PlayerModel[] = [];
  loading = false;
  editingId: number | null = null;

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers(): void {
    this.loading = true;
    this.playerService.findAll().subscribe({
      next: (data) => {
        this.players = data;
        this.loading = false;
      },
      error: (error) => {
        Swal.fire({
          title: "Erro ao carregar Jogadores",
          text: error,
          icon: "error",
          confirmButtonText: "Ok"
        });
        this.loading = false;
      }
    });
  }

  savePlayer(isValid: boolean): void {
    if (!isValid) {
      Swal.fire({
        title: "Por favor preencha todos os campos!",
        icon: "warning",
        confirmButtonText: "Ok"
      })
      return;
    }

    if (this.editingId) {
      this.playerService.update(this.editingId, this.player).subscribe({
        next: (response) => {
          Swal.fire({
            title: response,
            icon: "success",
            confirmButtonText: "Ok"
          })
          this.resetForm();
          this.loadPlayers();
        },
        error: (error) => {
          Swal.fire({
            title: "Erro ao atualizar o jogador",
            icon: "error",
            text: error,
            confirmButtonText: "Ok"
          })
        }
      });
    } else {
      this.playerService.save(this.player).subscribe({
        next: (response) => {
          Swal.fire({
            title: response,
            icon: "success",
            confirmButtonText: "Ok"
          })
          this.resetForm();
          this.loadPlayers();
        },
        error: (error) => {
          Swal.fire({
            title: "Erro ao salvar jogador",
            icon: "error",
            text: error,
            denyButtonText: "Ok"
          })
        }
      });
    }
  }

  editPlayer(player: PlayerModel): void {
    this.player = { ...player };
    this.editingId = player.id || null;
  }

  deletePlayer(id: number): void {
    Swal.fire({
      title: "Tem certeza?",
      icon: "warning",
      showConfirmButton: true,
      confirmButtonText: "Sim",
      showCancelButton: true,
      cancelButtonText: "Cancelar"
    }).then((result)=>{
      if(result.isConfirmed){
        this.playerService.delete(id).subscribe({
        next: (response) => {
          Swal.fire({
            title: "Jogador excluído com sucesso",
            icon: "success",
            confirmButtonText: "Ok"
          })
          this.loadPlayers();
        },
        error: (error) => {
          Swal.fire({
            title: "Erro ao excluir jogador",
            icon: "error",
            text: error,
            confirmButtonText: "Ok"
          })
        }
      });
      }
    })
  }

  resetForm(): void {
    this.player = {
      nome: '',
      partidas: 0,
      pontuacao: 0
    };
    this.editingId = null;
  }

  calculateAverage(player: PlayerModel): number {
    if (!player.partidas || player.partidas === 0) return 0;
    return Math.round((player.pontuacao || 0) / player.partidas);
  }

}