import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player as PlayerModel } from '../models/player.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private apiUrl = 'http://localhost:8080/player';

  constructor(private http: HttpClient) { }

  save(player: PlayerModel): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/save`, player);
  }

  findAll(): Observable<PlayerModel[]> {
    return this.http.get<PlayerModel[]>(`${this.apiUrl}/findAll`);
  }

  findById(id: number): Observable<PlayerModel> {
    return this.http.get<PlayerModel>(`${this.apiUrl}/findById/${id}`);
  }

  update(id: number, player: PlayerModel): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/update/${id}`, player);
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/delete/${id}`);
  }
}