import { Routes } from '@angular/router';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { HomeComponent } from './components/pages/home/home.component';

export const routes: Routes = [
    {path: "", redirectTo: "home", pathMatch: 'full'},
    {path: "", component: PrincipalComponent, children:[
        {path: "home", component: HomeComponent}
    ]}
];
