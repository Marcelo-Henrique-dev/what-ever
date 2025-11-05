import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../models/player'
import { ApiResnponse } from '../models/api-resnponse';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  http = inject(HttpClient)

  API = "http://localhost:8080/players";

  findAll(): Observable<ApiResnponse<Player[]>>{
    return this.http.get<ApiResnponse<Player[]>>(this.API+"/findAll");
  }

  findById(id: number): Observable<ApiResnponse<Player>>{
    return this.http.get<ApiResnponse<Player>>(this.API+"/findById/"+id);
  }

  save(player: Player): Observable<ApiResnponse<Player>>{
    return this.http.post<ApiResnponse<Player>>(this.API+"/save", player);
  }

  update(player: Player, id: number): Observable<ApiResnponse<Player>>{
    return this.http.put<ApiResnponse<Player>>(this.API+"/update/"+id, player);
  }

}
