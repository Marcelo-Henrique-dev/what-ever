import { Routes } from '@angular/router';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { HomeComponent } from './components/pages/home/home.component';
import { PlayerdetailsComponent } from './components/pages/players/playerdetails/playerdetails.component';
import { PlayerlistaComponent } from './components/pages/players/playerlista/playerlista.component';
import { RankingComponent } from './components/pages/players/ranking/ranking.component';
import { QuizComponent } from './components/pages/quiz/quiz.component';

export const routes: Routes = [
    {path: "", redirectTo: "home", pathMatch: 'full'},
    {path: "", component: PrincipalComponent, children:[
        {path: "home", component: HomeComponent},
        {path: "register-player", component: PlayerdetailsComponent},
        {path: "register-player/:id", component: PlayerdetailsComponent},
        {path: "lista-jogadores", component: PlayerlistaComponent},
        {path: "ranking", component: RankingComponent},
        {path: "quiz", component: QuizComponent}
    ]}
];
