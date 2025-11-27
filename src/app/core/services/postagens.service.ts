import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostagensService {
  
  private apiBase = 'https://localhost:7296/api/Postagem'

  constructor(private httpClient: HttpClient, private authService: AuthService){}


criarPostagem(payload:{  
  conteudo:string;
  anonimo: boolean;
}): Observable<any>{
  const url = `${this.apiBase}/criar`
  const user = this.authService.getCurrentUser();

  const body = {
    ...payload,
    autorId: user?.usuarioId ?? null,
  };

  return this.httpClient.post(url, body);
}

listarPostagens(){
  const url = `${this.apiBase}/obter-todas`
  return this.httpClient.get<any[]>(url);
}

}

