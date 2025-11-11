import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { QuizQuestion, UserAnswer } from '../../../models/quiz';
import Swal from 'sweetalert2';
import { PlayerService } from '../../../service/player.service';
import { lastValueFrom } from 'rxjs';
import { Player } from '../../../models/player';

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
  playerSelecionado!: Player;
  playerService = inject(PlayerService);
  userAnswers: {
    [questionIndex: number] :string
  } = {};

  constructor(){
    this.carregarQuestoes();
  }

  carregarQuestoes(){
    const navigationState = this.router.getCurrentNavigation()?.extras.state;
    if(navigationState && 'questions' in navigationState){
      this.questions = navigationState['questions'] as QuizQuestion[];
    }else{
      console.log("Sem navigationState")
    }
  }

  registerAnswer(questionIndex: number, answer: string): void{
    this.userAnswers[questionIndex] = answer;
  }

  calculateScoreAndResults(): {score: number, results: UserAnswer[]}{
    let score = 0;
    const results: UserAnswer[] = [];
    this.questions.forEach((question, index)=>{
      const userAnswer = this.userAnswers[index];
      const isCorrect = userAnswer === question.correct_answer;
      if(isCorrect){
        score++;
      }
      results.push({
        question: question.question,
        user_answer: userAnswer || "Não Respondida",
        correct_answer: question.correct_answer,
        is_correct: isCorrect
      });
    })
    return {score, results}
  }

  avancarQuestao(): void{
    if (this.questions.length === 0) return;
    if(this.questaoAtualIndex < this.questions.length - 1){
      this.questaoAtualIndex++;
      // this.rolarParaQuestao(this.questaoAtualIndex);
    }else if(this.questaoAtualIndex === this.questions.length-1){
      this.finalizarQuiz();
    }
  }

  async finalizarQuiz(): Promise<void>{
    const {score, results} = this.calculateScoreAndResults();
    try{
      const navigationState = this.router.getCurrentNavigation()?.extras.state;
      if(navigationState && 'idSelectedPlayer' in navigationState){
        this.playerSelecionado = navigationState['selectedPlayer'];
        await lastValueFrom(this.playerService.update(this.playerSelecionado, this.playerSelecionado.id));
      }
      Swal.fire({
        title: "Quiz Concluído! 🎉",
        text: `Você acertou ${score} de ${this.questions.length} questões. Seu placar foi atualizado!`,
        icon: "success",
        confirmButtonText: "Ver Resultados"
      }).then(() => {
        this.router.navigate(['/resultados'], { 
          state: { 
            totalScore: score, 
            totalQuestions: this.questions.length,
            quizResults: results 
          } 
        });
      });
    }catch(error){
      
    }
  }

  voltarQuestao(): void{
    if(this.questaoAtualIndex > 0){
      this.questaoAtualIndex--;
      // this.rolarParaQuestao(this.questaoAtualIndex);
    }
  }

  // rolarParaQuestao(index: number): void{
  //   const questaoElement = document.getElementById(index.toString());
  //   if(questaoElement){
  //     questaoElement.scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'center',
  //       inline: 'center'
  //     })
  //   }
  // }

}
