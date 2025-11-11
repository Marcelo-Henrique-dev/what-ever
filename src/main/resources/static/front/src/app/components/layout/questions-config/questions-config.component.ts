import { Component, inject } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { QuizConfig, QuizQuestion } from '../../../models/quiz';
import { Category } from '../../../models/category';
import { QuizService } from '../../../service/quiz.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Player } from '../../../models/player';
import { PlayerService } from '../../../service/player.service';
import { TranslationService } from '../../../service/translation.service';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';

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
  traducaoService = inject(TranslationService);
  playerSelecionadoId: number | undefined;
  playerSelecionado: Player = new Player(0, '', 0, 0);
  questions: QuizQuestion[] = [];

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
          text: JSON.stringify(error),
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

  private decodeHtmlEntities(text: string): string {
    const doc = new DOMParser().parseFromString(text, 'text/html');
    return doc.documentElement.textContent || text;
  }

  iniciarQuiz(quizConfig: QuizConfig){
    this.quizService.getQuestions(quizConfig).pipe(
      switchMap(response => {
        const questionsToTranslate = response.results as QuizQuestion[];

        const translatedQuestionsObservables = questionsToTranslate.map(question => {
          const decodedQuestion = this.decodeHtmlEntities(question.question);
          const decodedCategory = this.decodeHtmlEntities(question.category);
          const decodedCorrectAnswer = question.correct_answer ? this.decodeHtmlEntities(question.correct_answer) : undefined;
          const decodedIncorrectAnswers = (question.incorrect_answers && Array.isArray(question.incorrect_answers)) 
            ? question.incorrect_answers.map(ans => this.decodeHtmlEntities(ans))
            : [];
          
          const qObservable = this.translate(decodedQuestion);
          const cObservable = this.translate(decodedCategory);
          
          const caObservable = decodedCorrectAnswer 
            ? this.translate(decodedCorrectAnswer)
            : of(undefined);

          const iaTranslatedObservable: Observable<string[]> = 
            (decodedIncorrectAnswers.length > 0)
              ? forkJoin(decodedIncorrectAnswers.map(ans => this.translate(ans)))
              : of([] as string[]);

          return forkJoin({
            question: qObservable,
            category: cObservable,
            correct_answer: caObservable,
            incorrect_answers: iaTranslatedObservable
          }).pipe(
            map(translations => ({
              ...question,
              question: translations.question,
              category: translations.category,
              correct_answer: translations.correct_answer as string,
              incorrect_answers: translations.incorrect_answers
            }))
          );
        });

        return forkJoin(translatedQuestionsObservables);
      }),
      catchError(error => {
        Swal.fire({
          title: "Erro ao carregar/traduzir questões",
          text: error.message || JSON.stringify(error),
          icon: "error",
          confirmButtonText: "Ok"
        });
        return of([]);
      })
    )
    .subscribe({
      next: (translatedQuestions: QuizQuestion[]) =>{
        this.questions = translatedQuestions;
        this.router.navigate(["quiz/questions"],{
          state: {
            questions: this.questions,
            selectedPlayer: this.playerSelecionado
          }
        })
      },
      error: (error) => {
        console.error("Erro final no Quiz", error);
      }
    })
  }

  translate(texto: string): Observable<string> {
    const API_ERROR_TEXT = "INVALID LANGUAGE PAIR SPECIFIED";

    return this.traducaoService.traduzir(texto).pipe(
      map(retorno => {
        const translatedText = retorno.responseData.translatedText;
        
        if (translatedText && translatedText.includes(API_ERROR_TEXT)) {
          throw new Error("Falha na Tradução. O servidor retornou: " + translatedText);
        }
        
        return translatedText;
      }),
      catchError(error => {
        console.error("Erro ao traduzir: ", error);
        return of(texto); 
      })
    );
  }

}
