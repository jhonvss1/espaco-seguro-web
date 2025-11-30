import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PostagensService {
  private readonly apiUrl = environment.apiUrl;
  private readonly urlApiPostagens = `${this.apiUrl}/api/Postagem`;
  private readonly urlApiCurtidas = `${this.apiUrl}/api/Curtida`;

  constructor(private clienteHttp: HttpClient, private servicoAutenticacao: AuthService) {}

  criarPostagem(dadosPostagem: { conteudo: string; anonimo: boolean }): Observable<any> {
    const urlCriacao = `${this.urlApiPostagens}/criar`;
    const usuarioAutenticado = this.servicoAutenticacao.getCurrentUser();

    const corpoRequisicao = {
      ...dadosPostagem,
      autorId: usuarioAutenticado?.usuarioId ?? null,
    };

    return this.clienteHttp.post(urlCriacao, corpoRequisicao);
  }

  listarPostagens(): Observable<any[]> {
    const urlListagem = `${this.urlApiPostagens}/obter-todas`;
    return this.clienteHttp.get<any[]>(urlListagem);
  }

  obterPostagemPorId(identificadorPostagem: string): Observable<any> {
    const urlDetalhe = `${this.urlApiPostagens}/obter/${identificadorPostagem}`;
    return this.clienteHttp.get<any>(urlDetalhe);
  }

  curtirPostagem(identificadorPostagem: string): Observable<any> {
    const usuarioAutenticado = this.servicoAutenticacao.getCurrentUser();
    const usuarioId = usuarioAutenticado?.usuarioId ?? '';

    const urlCurtida = `${this.urlApiCurtidas}/${identificadorPostagem}`;
    const parametros = new HttpParams().set('usuarioId', usuarioId);

    return this.clienteHttp.post(urlCurtida, null, { params: parametros });
  }

  descurtirPostagem(identificadorPostagem: string): Observable<any> {
    const usuarioAutenticado = this.servicoAutenticacao.getCurrentUser();
    const usuarioId = usuarioAutenticado?.usuarioId ?? '';

    const urlCurtida = `${this.urlApiCurtidas}/${identificadorPostagem}`;
    const parametros = new HttpParams().set('usuarioId', usuarioId);

    return this.clienteHttp.delete(urlCurtida, { params: parametros });
  }
}
