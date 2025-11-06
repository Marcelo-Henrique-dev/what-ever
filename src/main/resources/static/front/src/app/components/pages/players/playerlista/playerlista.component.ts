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
  startPage: number = 0;
  readonly maxPagesToShow = 6;
  readonly bufferPages = 3;

  constructor(){
    this.listPlayers();
  }

  listPlayers(){
    this.playerService.findAll(this.page, this.size).subscribe({
      next: (response) => {
        this.lista = response.content;
        this.pageNumber = response.number;
        if(this.pages.length === 0){
          for(let i = 0; i<response.totalPages; i++){
            this.pages.push(i);
          }
        }
        this.adjustStartPage();
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
    if(this.page == this.pages.length-1){
      return;
    }else{
      this.page++;
      this.listPlayers();
      this.firstLoad = false;
    }
  }
  
  voltarPagina(){
    if(this.page == 0){
      return;
    }else{
      this.page--;
      this.listPlayers();
      this.firstLoad = false;
    }
  }

  irParaPagina(page: number){
    this.page = page;
    this.listPlayers();
    this.firstLoad = false;
  }

  adjustStartPage(){
    const totalPages = this.pages.length;
    if (totalPages <= this.maxPagesToShow) {
        this.startPage = 0;
        return;
    }
    const triggerNextIndex = this.startPage + (this.maxPagesToShow - this.bufferPages);
    
    if (this.pageNumber >= triggerNextIndex) {
      this.startPage = this.pageNumber - (this.maxPagesToShow - this.bufferPages);
    } 
    const bufferBack = this.bufferPages > 1 ? 1 : 0;
    const triggerPrevIndex = this.startPage + bufferBack;
    if (this.pageNumber < triggerPrevIndex) {
      this.startPage = this.pageNumber - this.bufferPages + 1;
    }
    const maxPossibleStart = totalPages - this.maxPagesToShow;
    if (this.startPage > maxPossibleStart) {
      this.startPage = maxPossibleStart;
    }
    if (this.startPage < 0) {
      this.startPage = 0;
    }
}

}
