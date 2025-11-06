import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../models/player'
import { ApiResnponse } from '../models/api-resnponse';
import { PageResponse } from '../models/page-response';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  http = inject(HttpClient)

  API = "http://localhost:8080/players";
  API_PERFORMANCE = "http://localhost:8080/what-ever/performance";

  findAll(page: number, size: number): Observable<PageResponse<Player>>{
    return this.http.get<PageResponse<Player>>(this.API_PERFORMANCE+"/cache?page="+page+"&size="+size);
  }
  
  findAllRank(): Observable<ApiResnponse<Player[]>>{
    return this.http.get<ApiResnponse<Player[]>>(this.API+"/findAll");
  }

  findById(id: number): Observable<ApiResnponse<Player>>{
    return this.http.get<ApiResnponse<Player>>(this.API+"/findById/"+id);
  }

  save(player: Player): Observable<ApiResnponse<Player>>{
    return this.http.post<ApiResnponse<Player>>(this.API, player);
  }

  update(player: Player, id: number): Observable<ApiResnponse<Player>>{
    return this.http.put<ApiResnponse<Player>>(this.API+"/update/"+id, player);
  }  

}
