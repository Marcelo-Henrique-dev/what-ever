import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { PlayerComponent } from './components/player/player';
import { QuizComponent } from './components/quiz/quiz';
import { RankingComponent } from './components/ranking/ranking';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'player', component: PlayerComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'ranking', component: RankingComponent },
  { path: '**', redirectTo: '/home' }
];