import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Player as PlayerModel } from '../../models/player.model';
import { PlayerService } from '../../services/player';

@Component({
  selector: 'app-ranking',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './ranking.html',
  styleUrl: './ranking.scss',
})
export class RankingComponent implements OnInit {
  players: PlayerModel[] = [];
  sortedPlayers: PlayerModel[] = [];
  loading = false;
  sortBy = 'pontuacao';
  filterText = '';
  
  message = '';
  messageType: 'success' | 'error' = 'success';

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers(): void {
    this.loading = true;
    this.playerService.findAll().subscribe({
      next: (data) => {
        this.players = data;
        this.sortPlayers();
        this.loading = false;
      },
      error: (error) => {
        this.showMessage('Erro ao carregar ranking: ' + error.message, 'error');
        this.loading = false;
      }
    });
  }

  sortPlayers(): void {
    this.sortedPlayers = [...this.players];
    
    switch (this.sortBy) {
      case 'pontuacao':
        this.sortedPlayers.sort((a, b) => (b.pontuacao || 0) - (a.pontuacao || 0));
        break;
      case 'partidas':
        this.sortedPlayers.sort((a, b) => (b.partidas || 0) - (a.partidas || 0));
        break;
      case 'media':
        this.sortedPlayers.sort((a, b) => this.calculateAverage(b) - this.calculateAverage(a));
        break;
      case 'nome':
        this.sortedPlayers.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
    }
    
    this.filterPlayers();
  }

  filterPlayers(): void {
    if (!this.filterText.trim()) {
      this.sortPlayers();
      return;
    }
    
    const filtered = this.sortedPlayers.filter(player => 
      player.nome.toLowerCase().includes(this.filterText.toLowerCase())
    );
    
    this.sortedPlayers = filtered;
  }

  calculateAverage(player: PlayerModel): number {
    if (!player.partidas || player.partidas === 0) return 0;
    return Math.round((player.pontuacao || 0) / player.partidas);
  }

  getTotalScore(): number {
    return this.players.reduce((total, player) => total + (player.pontuacao || 0), 0);
  }

  getTotalGames(): number {
    return this.players.reduce((total, player) => total + (player.partidas || 0), 0);
  }

  getAverageScore(): number {
    const totalPlayers = this.players.length;
    if (totalPlayers === 0) return 0;
    return Math.round(this.getTotalScore() / totalPlayers);
  }

  refreshRanking(): void {
    this.loadPlayers();
    this.showMessage('Ranking atualizado com sucesso!', 'success');
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