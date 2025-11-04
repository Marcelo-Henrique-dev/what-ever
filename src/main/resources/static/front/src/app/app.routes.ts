import { Routes } from '@angular/router';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { WelcomeComponent } from './components/pages/welcome/welcome.component';
import { PlayerComponent } from './components/pages/player/player.component';
import { QuizComponent } from './components/pages/quiz/quiz.component';

export const routes: Routes = [
    {path: "", redirectTo: "/home", pathMatch: 'full'},
    {path: "home", component: PrincipalComponent, children:[
        {path: "welcome", component: WelcomeComponent},
        {path: "player", component: PlayerComponent},
        {path: "quiz", component: QuizComponent}
    ]}
];
