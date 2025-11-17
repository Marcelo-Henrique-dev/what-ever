import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../models/player'
import { ApiResponse } from '../models/api-response';
import { PageResponse } from '../models/page-response';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  http = inject(HttpClient)

  API = "http://localhost:8081/players";
  API_PERFORMANCE = "http://localhost:8081/what-ever/performance";

  findAll(page: number, size: number): Observable<PageResponse<Player>>{
    return this.http.get<PageResponse<Player>>(this.API_PERFORMANCE+"/com-paginacao?page="+page+"&size="+size);
  }
  
  findAllRank(): Observable<ApiResponse<Player[]>>{
    return this.http.get<ApiResponse<Player[]>>(this.API+"/findAll");
  }

  findById(id: number): Observable<ApiResponse<Player>>{
    return this.http.get<ApiResponse<Player>>(this.API+"/findById/"+id);
  }

  save(player: Player): Observable<ApiResponse<Player>>{
    return this.http.post<ApiResponse<Player>>(this.API, player);
  }

  update(player: Player, id: number): Observable<ApiResponse<Player>>{
    return this.http.put<ApiResponse<Player>>(this.API+"/update/"+id, player);
  }  

  delete(id: number): Observable<ApiResponse<void>>{
    return this.http.delete<ApiResponse<void>>(this.API+"/delete/"+id);
  }

}
