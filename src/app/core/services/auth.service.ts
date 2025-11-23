import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiBase = 'https://localhost:7296/api';

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    return true;
  }

  cadastrarUsuario(payload: {
    nome: string;
    dataNascimento: string;
    email: string;
    cpf: string;
    telefone: string;
    senha: string;
    confirmarSenha: string;
    aceitaTermos: boolean;
  }): Observable<any> {
    const url = `${this.apiBase}/Usuario/criar`;
    return this.http.post(url, payload);
  }
}
