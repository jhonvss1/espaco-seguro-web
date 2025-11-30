import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CardService {
  private readonly apiUrl = environment.apiUrl;
  private readonly apiBase = `${this.apiUrl}/api/Card`;

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
