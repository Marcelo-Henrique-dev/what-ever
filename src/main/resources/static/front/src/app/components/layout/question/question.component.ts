import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { QuizQuestion, UserAnswer } from '../../../models/quiz';
import Swal from 'sweetalert2';
import { PlayerService } from '../../../service/player.service';
import { lastValueFrom } from 'rxjs';
import { Player } from '../../../models/player';
import { QuizService } from '../../../service/quiz.service';

@Component({
  selector: 'app-question',
  imports: [],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css',
})
export class QuestionComponent {
  router = inject(Router);
  questions: QuizQuestion[] = [];
  questaoAtualIndex: number = 0;
  playerSelecionado!: Player;
  playerService = inject(PlayerService);
  quizService = inject(QuizService)
  opcoesEmbaralhadas: string[] = [];
  userAnswers: {
    [questionIndex: number]: string;
  } = {};

  constructor() {
    this.carregarEstadoInicial();
    this.carregarOpcoesParaQuestaoAtual();
  }

  carregarEstadoInicial() {
    const state = history.state;
    if (state && 'questions' in state) {
      this.questions = state['questions'] as QuizQuestion[];
    } else {
      console.error('Erro: Questões não encontradas no estado de navegação.');
    }
    if (state && 'selectedPlayer' in state) {
      this.playerSelecionado = state['selectedPlayer'] as Player;
    } else {
      console.error(
        "ERRO CRÍTICO: Objeto 'selectedPlayer' não encontrado no history.state. O placar não poderá ser salvo."
      );
    }
  }

  carregarOpcoesParaQuestaoAtual(){
    if(this.questions.length === 0) return;
    const question = this.questions[this.questaoAtualIndex];
    const todasOpcoes = [
      ...question.incorrect_answers,
      question.correct_answer
    ];
    this.opcoesEmbaralhadas = this.quizService.embaralharArray(todasOpcoes);
  }

  registerAnswer(questionIndex: number, answer: string): void {
    this.userAnswers[questionIndex] = answer;
  }

  calculateScoreAndResults(): { score: number; results: UserAnswer[] } {
    let score = 0;
    const results: UserAnswer[] = [];
    this.questions.forEach((question, index) => {
      const userAnswer = this.userAnswers[index];
      const isCorrect = userAnswer === question.correct_answer;
      if (isCorrect) {
        score += 10;
      }
      results.push({
        question: question.question,
        user_answer: userAnswer || 'Não Respondida',
        correct_answer: question.correct_answer,
        is_correct: isCorrect,
        question_id: this.questions.indexOf(question)+1
      });
    });
    return { score, results };
  }

  avancarQuestao(): void {
    if (this.questions.length === 0) return;
    if (this.questaoAtualIndex < this.questions.length - 1) {
      this.questaoAtualIndex++;
      this.carregarOpcoesParaQuestaoAtual();
    } else if (this.questaoAtualIndex === this.questions.length - 1) {
      this.finalizarQuiz();
    }
  }
  
  async finalizarQuiz(): Promise<void> {
    const { score, results } = this.calculateScoreAndResults();
    
    try {
      if (this.playerSelecionado && this.playerSelecionado.id > 0) {
        this.playerSelecionado.pontuacao += score;
        this.playerSelecionado.partidas++;
        await lastValueFrom(
          this.playerService.update(
            this.playerSelecionado,
            this.playerSelecionado.id
          )
        );
      } else {
        console.error(
          'AVISO: Player não carregado ou inválido. O placar não será salvo no DB.'
        );
      }
      
      Swal.fire({
        title: 'Quiz Concluído! 🎉',
        text: `Você fez ${score}pts de ${(this.questions.length)*10}. Seu placar foi atualizado!`,
        icon: 'success',
        confirmButtonText: 'Ver Resultados',
      }).then(() => {
        this.router.navigate(['/resultados'], {
          state: {
            totalScore: score,
            totalQuestions: this.questions.length,
            quizResults: results,
          },
        });
      });
    } catch (error) {
      console.error(
        'ERRO CRÍTICO ao finalizar quiz e atualizar jogador:',
        error
      );
      Swal.fire({
        title: 'Erro de Servidor',
        text: `Não foi possível salvar o placar. Verifique o console e o backend para detalhes do erro.`,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  }
  
  voltarQuestao(): void {
    if (this.questaoAtualIndex > 0) {
      this.questaoAtualIndex--;
      this.carregarOpcoesParaQuestaoAtual();
    }
  }
}
