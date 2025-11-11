import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Translation } from '../models/translation';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  http = inject(HttpClient);

  traduzir(texto: string): Observable<Translation>{
    texto = encodeURI(texto);
    const url = `https://api.mymemory.translated.net/get?q=${texto}&langpair=en|pt`;
    return this.http.get<Translation>(url);
  }

}
