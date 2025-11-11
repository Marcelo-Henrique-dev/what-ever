import { AfterViewInit, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { UserAnswer } from '../../../models/quiz';
Chart.register(...registerables);

@Component({
  selector: 'app-resultados',
  imports: [],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css'
})
export class ResultadosComponent implements AfterViewInit {

  router = inject(Router)
  score!:number;
  totalQuestions!: number;
  corretas: UserAnswer[] = [];
  questions: UserAnswer[] = [];
  incorretas: UserAnswer[] = [];
  totalAcertos!: number;
  totalErros!: number;
  chart: any;

  ngAfterViewInit(): void {
      this.carregarInformacoes();
      this.criarChart();
  }

  carregarInformacoes(){
    const state = history.state;
    this.score = state.totalScore;
    this.totalQuestions = state.totalQuestions;
    this.questions = state.quizResults;
    this.carregarIncorretas();
  }

  carregarIncorretas(){
    this.questions.forEach((question)=>{
      if(question.is_correct == false){
        this.incorretas.push(question)
      }else if(question.is_correct == true){
        this.corretas.push(question)
      }
    });
    this.totalAcertos = this.corretas.length;
    this.totalErros = this.incorretas.length;
  }

  criarChart(): void {
    const data = {
      labels: [
        'Erros',
        'Acertos',
      ],
      datasets: [{
        label: 'Quiz',
        data: [this.totalErros, this.totalAcertos], 
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)'
        ],
        hoverOffset: 4
      }]
    };

    const config: any = {
      type: 'doughnut',
      data: data,
    };
    this.chart = new Chart("MyChart", config);
  }

}
