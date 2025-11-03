import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuizQuestion, QuizConfig, QuizResponse } from '../models/quiz.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private openTriviaUrl = 'https://opentdb.com/api.php';

  constructor(private http: HttpClient) { }

  getQuestions(config: QuizConfig): Observable<QuizResponse> {
    const params = new URLSearchParams();
    params.append('amount', config.amount.toString());
    
    if (config.category) {
      params.append('category', config.category.toString());
    }
    
    if (config.difficulty) {
      params.append('difficulty', config.difficulty);
    }
    
    if (config.type) {
      params.append('type', config.type);
    }

    return this.http.get<QuizResponse>(`${this.openTriviaUrl}?${params.toString()}`);
  }

  calculateScore(questions: QuizQuestion[], answers: string[]): number {
    let score = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correct_answer) {
        score += 10;
      }
    });
    return score;
  }

  shuffleArray(array: string[]): string[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}