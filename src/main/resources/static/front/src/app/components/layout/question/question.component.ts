import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { QuizQuestion, QuizResponse } from '../../../models/quiz';

@Component({
  selector: 'app-question',
  imports: [],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent {

  router = inject(Router)
  questions: QuizQuestion[] = [];

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

}
