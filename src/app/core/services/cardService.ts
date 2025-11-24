import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CardService {
  private readonly apiBase = 'https://localhost:7296/api/Card';

  constructor(private httpClient: HttpClient, private authService: AuthService) {}
  
  criarCard(payload: {  
    titulo: string;
    resumo: string;
    corpo: string;
    tipo: 'texto' | 'infografico' | 'video';
    urlMidia: string;    
  }):Observable<any> {
    const url = `${this.apiBase}/criar`;
    const user = this.authService.getCurrentUser();

    const body = {
      ...payload,
      autorId: user?.usuarioId ?? null, // enviado "por baixo dos panos"
    };

    return this.httpClient.post(url, body);
  }

  listarCards(): Observable<any[]> {
    const url = `${this.apiBase}/obter-todos`;
    return this.httpClient.get<any[]>(url);
  }

  obterCardPorId(id: string): Observable<any> {
    const url = `${this.apiBase}/obter/${id}`;
    return this.httpClient.get<any>(url);
  }
}
