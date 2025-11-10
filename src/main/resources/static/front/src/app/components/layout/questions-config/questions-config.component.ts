import { Component, inject } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { QuizConfig } from '../../../models/quiz';
import { Category } from '../../../models/category';
import { QuizService } from '../../../service/quiz.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Player } from '../../../models/player';
import { PlayerService } from '../../../service/player.service';

@Component({
  selector: 'app-questions-config',
  imports: [FormsModule],
  templateUrl: './questions-config.component.html',
  styleUrl: './questions-config.component.css'
})
export class QuestionsConfigComponent {

  categorias!: Category[];
  quizService = inject(QuizService);
  playerService = inject(PlayerService);
  router = inject(Router)
  playerSelecionadoId: number | undefined;
  playerSelecionado: Player = new Player(0, '', 0, 0);

  quizConfig: QuizConfig ={
    amount: 10,
    category: undefined,
    difficulty: "",
    type: ""
  }

  constructor(){
    this.carregarCategorias();
    this.getPlayerSelecionado();
  }

  carregarCategorias(){
    this.quizService.getCategories().subscribe({
      next: (response) =>{
        this.categorias = response.trivia_categories;
      },
      error: (error) => {
        Swal.fire({
          title: "Erro ao carregar as categorias",
          text: error,
          icon: "error",
          confirmButtonText: "Ok"
        })
      }
    });
  }

  getPlayerSelecionado(){
    const navigationState = this.router.getCurrentNavigation()?.extras.state;
    if(navigationState && 'id' in navigationState){
      this.playerSelecionadoId = navigationState['id'];
      this.carregarPlayer(navigationState['id']);
    }else{
      Swal.fire({
        title: "Jogador não encontrado",
        icon: "error",
        confirmButtonText: "Ok"
      })
    }
  }

  carregarPlayer(id: number){
    this.playerService.findById(id).subscribe({
      next: (response) => {
        this.playerSelecionado = response.data;
      },
      error: (error) => {
        Swal.fire({
          title: "Jogador não encontrado",
          text: error,
          icon: "error",
          confirmButtonText: "Ok"
        })
      }
    });
  }

}
