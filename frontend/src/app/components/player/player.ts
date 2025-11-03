import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Player as PlayerModel } from '../../models/player.model';
import { PlayerService } from '../../services/player';

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
  message = '';
  messageType: 'success' | 'error' = 'success';
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
        this.showMessage('Erro ao carregar jogadores: ' + error.message, 'error');
        this.loading = false;
      }
    });
  }

  savePlayer(isValid: boolean): void {
    if (!isValid) {
      this.showMessage('Por favor, preencha todos os campos obrigatórios', 'error');
      return;
    }

    if (this.editingId) {
      this.playerService.update(this.editingId, this.player).subscribe({
        next: (response) => {
          this.showMessage(response, 'success');
          this.resetForm();
          this.loadPlayers();
        },
        error: (error) => {
          this.showMessage(error.error || 'Erro ao atualizar jogador', 'error');
        }
      });
    } else {
      this.playerService.save(this.player).subscribe({
        next: (response) => {
          this.showMessage(response, 'success');
          this.resetForm();
          this.loadPlayers();
        },
        error: (error) => {
          this.showMessage(error.error || 'Erro ao salvar jogador', 'error');
        }
      });
    }
  }

  editPlayer(player: PlayerModel): void {
    this.player = { ...player };
    this.editingId = player.id || null;
  }

  deletePlayer(id: number): void {
    if (confirm('Tem certeza que deseja excluir este jogador?')) {
      this.playerService.delete(id).subscribe({
        next: (response) => {
          this.showMessage(response, 'success');
          this.loadPlayers();
        },
        error: (error) => {
          this.showMessage(error.error || 'Erro ao excluir jogador', 'error');
        }
      });
    }
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

  showMessage(msg: string, type: 'success' | 'error'): void {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => {
      this.clearMessage();
    }, 5000);
  }

  clearMessage(): void {
    this.message = '';
  }
}