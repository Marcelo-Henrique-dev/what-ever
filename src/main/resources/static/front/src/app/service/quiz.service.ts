import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { QuizConfig, QuizQuestion, QuizResponse } from '../models/quiz';
import { Observable } from 'rxjs';
import { TriviaCategories } from '../models/trivia-categories';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  http = inject(HttpClient)

  private openTriviaUrl = "https://opentdb.com/api.php";
  private openTriviaCategories = "https://opentdb.com/api_category.php";

  getQuestions(config: QuizConfig): Observable<QuizResponse>{
    const params = new URLSearchParams();
    params.append('amount', config.amount.toString());
    if(config.category){
      params.append("category", config.category.toString());
    }
    if(config.difficulty){
      params.append("difficulty", config.difficulty.toString());
    }
    if(config.type){
      params.append("type", config.type.toString());
    }
    return this.http.get<QuizResponse>(`${this.openTriviaUrl}?${params.toString()}`);
  }

  calculateScore(questions: QuizQuestion[], answers: string[]): number{
    let score = 0;
    questions.forEach((question, index)=>{
      if(answers[index] === question.correct_answer){
        score += 10;
      }
    });
    return score;
  }

  embaralharArray(array: string[]): string[]{
    const shuffled = [...array];
    for(let i=shuffled.length-1; i>0; i--){
      const j = Math.floor(Math.random()* (i+1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  getCategories(): Observable<TriviaCategories>{
    return this.http.get<TriviaCategories>(`${this.openTriviaCategories}`);
  }

}