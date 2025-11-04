import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Player as PlayerModel } from '../../models/player.model';
import { QuizConfig, QuizQuestion } from '../../models/quiz.model';
import { PlayerService } from '../../services/player';
import { QuizService } from '../../services/quiz';

@Component({
  selector: 'app-quiz',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './quiz.html',
  styleUrl: './quiz.scss',
})
export class QuizComponent implements OnInit {
  players: PlayerModel[] = [];
  selectedPlayerId: number | null = null;
  selectedPlayer: PlayerModel | null = null;
  
  quizConfig: QuizConfig = {
    amount: 10,
    category: undefined,
    difficulty: undefined,
    type: undefined
  };
  
  quizStarted = false;
  quizCompleted = false;
  loading = false;
  
  questions: QuizQuestion[] = [];
  currentQuestionIndex = 0;
  currentQuestion: QuizQuestion | null = null;
  currentAnswers: string[] = [];
  selectedAnswer: string | null = null;
  userAnswers: string[] = [];
  
  currentScore = 0;
  correctAnswers = 0;
  
  message = '';
  messageType: 'success' | 'error' = 'success';

  constructor(
    private playerService: PlayerService,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers(): void {
    this.playerService.findAll().subscribe({
      next: (data) => {
        this.players = data;
      },
      error: (error) => {
        this.showMessage('Erro ao carregar jogadores: ' + error.message, 'error');
      }
    });
  }

  startQuiz(isValid: boolean): void {
    if (!isValid) {
      this.showMessage('Por favor, preencha todos os campos obrigatórios', 'error');
      return;
    }

    this.selectedPlayer = this.players.find(p => p.id === this.selectedPlayerId) || null;
    if (!this.selectedPlayer) {
      this.showMessage('Por favor, selecione um jogador', 'error');
      return;
    }

    this.loading = true;
    this.quizService.getQuestions(this.quizConfig).subscribe({
      next: (response) => {
        if (response.response_code === 0 && response.results.length > 0) {
          this.questions = response.results;
          this.quizStarted = true;
          this.currentQuestionIndex = 0;
          this.userAnswers = [];
          this.currentScore = 0;
          this.correctAnswers = 0;
          this.loadCurrentQuestion();
        } else {
          this.showMessage('Não foi possível carregar as perguntas. Tente novamente.', 'error');
        }
        this.loading = false;
      },
      error: (error) => {
        this.showMessage('Erro ao carregar perguntas: ' + error.message, 'error');
        this.loading = false;
      }
    });
  }

  loadCurrentQuestion(): void {
    this.currentQuestion = this.questions[this.currentQuestionIndex];
    this.selectedAnswer = null;
    
    if (this.currentQuestion) {
      this.currentAnswers = this.quizService.shuffleArray([
        this.currentQuestion.correct_answer,
        ...this.currentQuestion.incorrect_answers
      ]);
    }
  }

  selectAnswer(answer: string): void {
    this.selectedAnswer = answer;
  }

  nextQuestion(): void {
    if (!this.selectedAnswer) return;

    this.userAnswers[this.currentQuestionIndex] = this.selectedAnswer;

    if (this.selectedAnswer === this.currentQuestion!.correct_answer) {
      this.currentScore += 10;
      this.correctAnswers++;
    }

    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.loadCurrentQuestion();
    } else {
      this.completeQuiz();
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.loadCurrentQuestion();
      this.selectedAnswer = this.userAnswers[this.currentQuestionIndex] || null;
    }
  }

  completeQuiz(): void {
    this.quizCompleted = true;
    this.updatePlayerScore();
  }

  updatePlayerScore(): void {
    if (!this.selectedPlayer) return;

    const updatedPlayer: PlayerModel = {
      ...this.selectedPlayer,
      partidas: (this.selectedPlayer.partidas || 0) + 1,
      pontuacao: (this.selectedPlayer.pontuacao || 0) + this.currentScore
    };

    this.playerService.update(this.selectedPlayer.id!, updatedPlayer).subscribe({
      next: (response) => {
        console.log('Pontuação atualizada com sucesso');
      },
      error: (error) => {
        console.error('Erro ao atualizar pontuação:', error);
      }
    });
  }

  newQuiz(): void {
    this.quizStarted = false;
    this.quizCompleted = false;
    this.selectedPlayerId = null;
    this.selectedPlayer = null;
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.currentQuestion = null;
    this.currentAnswers = [];
    this.selectedAnswer = null;
    this.userAnswers = [];
    this.currentScore = 0;
    this.correctAnswers = 0;
  }

  getDifficultyText(difficulty: string): string {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'hard': return 'Difícil';
      default: return difficulty;
    }
  }

  getLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  getAccuracyRate(): number {
    if (this.questions.length === 0) return 0;
    return Math.round((this.correctAnswers / this.questions.length) * 100);
  }

  getAverageScore(): number {
    if (this.questions.length === 0) return 0;
    return Math.round(this.currentScore / this.questions.length);
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