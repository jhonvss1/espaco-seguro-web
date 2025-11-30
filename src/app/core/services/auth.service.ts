import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AuthUser {
  usuarioId: string;
  nome: string;
  email: string;
  tokenAcesso: string;
  funcao: string
}

const AUTH_USER_KEY = 'espaco_seguro_auth_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrlAuth = `${environment.apiUrl}/api/Auth`;
  private readonly baseUrlUsuario = `${environment.apiUrl}/api/Usuario`;

  private readonly _user = signal<AuthUser | null>(null);
  readonly user = this._user.asReadonly();
  readonly isLoggedIn = computed(() => !!this._user());

  constructor(private http: HttpClient) {
    //Aqui carregamos o usuário salvo no localStorage, se houver
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem(AUTH_USER_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as AuthUser;
          if (parsed && parsed.usuarioId) {
            this._user.set(parsed);
          }
        } catch {
          window.localStorage.removeItem(AUTH_USER_KEY);
        }
      }
    }
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }

  getCurrentUser(): AuthUser | null {
    return this._user();
  }

  logout(): void {
    this._user.set(null);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(AUTH_USER_KEY);
    }
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
    const url = `${this.baseUrlUsuario}/criar`;
    return this.http.post(url, payload);
  }

  loginUsuario(payload: {
    email: string;
    senha: string;
  }): Observable<AuthUser> {
    const url = `${this.baseUrlAuth}/login`;
    return this.http.post<AuthUser>(url, payload).pipe(
      tap((response: any) => {        
        const user: AuthUser = {
          usuarioId: response.usuarioId ?? response.usuarioId ?? response.usuarioId ?? '',
          nome: response.nome ?? response.name ?? '',
          email: response.email ?? '',
          tokenAcesso: response.token ?? response.accessToken,
          funcao: response.funcao ?? response.role ?? '',
        };
        this._user.set(user);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
        }
      }),
    );
  }
}
