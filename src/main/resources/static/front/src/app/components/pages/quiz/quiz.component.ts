import { Component } from '@angular/core';
import { QuestionsConfigComponent } from "../../layout/questions-config/questions-config.component";
import { QuestionComponent } from '../../layout/question/question.component';

@Component({
  selector: 'app-quiz',
  imports: [QuestionsConfigComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {

  state!: {
    questions: QuestionComponent[];
  };

}
