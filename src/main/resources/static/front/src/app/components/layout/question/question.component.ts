import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { QuizQuestion, QuizResponse } from '../../../models/quiz';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-question',
  imports: [],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent {

  router = inject(Router)
  questions: QuizQuestion[] = [];
  questaoAtualIndex: number = 0;

  constructor(){
    this.carregarQuestoes();
  }

  carregarQuestoes(){
    const navigationState = this.router.getCurrentNavigation()?.extras.state;
    if(navigationState && 'questions' in navigationState){
      this.questions = navigationState['questions'];
    }else{
      console.log("Sem navigationState")
    }
  }

  avancarQuestao(): void{
    if(this.questaoAtualIndex < this.questions.length - 1){
      this.questaoAtualIndex++;
      this.rolarParaQuestao(this.questaoAtualIndex);
    }else if(this.questaoAtualIndex === this.questions.length-1){
      Swal.fire({
        title: "Quiz Conluido",
        icon: "success",
        confirmButtonText: "Ok"
      })
    }
  }

  voltarQuestao(): void{
    if(this.questaoAtualIndex > 0){
      this.questaoAtualIndex--;
      this.rolarParaQuestao(this.questaoAtualIndex);
    }
  }

  rolarParaQuestao(index: number): void{
    const questaoElement = document.getElementById(index.toString());
    if(questaoElement){
      questaoElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      })
    }
  }

}
