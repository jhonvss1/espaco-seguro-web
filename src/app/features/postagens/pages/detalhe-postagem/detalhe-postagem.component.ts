import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ComentarioComponent } from '../../components/comentario/comentario.component';
import { PostagensService } from '../../../../core/services/postagens.service';

interface PostagemDetalhada {
  id: string;
  conteudo: string;
  dataPublicacao?: string;
  autor?: string | null;
  quantidadeCurtidas: number;
  quantidadeComentarios: number;
  curtidaPeloUsuario: boolean;
}

@Component({
  selector: 'app-detalhe-postagem',
  standalone: true,
  imports: [
    NavbarComponent,
    CardComponent,
    ButtonComponent,
    ComentarioComponent,
    CommonModule,
    DatePipe,
    FormsModule,
  ],
  templateUrl: './detalhe-postagem.component.html',
  styleUrl: './detalhe-postagem.component.scss',
})
export class DetalhePostagemComponent {
  postagemDetalhada: PostagemDetalhada | null = null;
  dialogoComentarioAberto = false;
  textoComentario = '';

  constructor(
    private rotaAtiva: ActivatedRoute,
    private servicoPostagens: PostagensService,
    private roteador: Router,
    private detectorAlteracoes: ChangeDetectorRef,
  ) {
    this.rotaAtiva.paramMap.subscribe((parametrosRota) => {
      const identificadorPostagem = parametrosRota.get('id');
      if (identificadorPostagem) {
        this.carregarPostagem(identificadorPostagem);
      }
    });
  }

  private carregarPostagem(postagemId: string) {
    this.servicoPostagens.obterPostagemPorId(postagemId).subscribe({
      next: (postagem) => {
        this.postagemDetalhada = {
          ...postagem,
          autor: postagem.autor ?? postagem.autorNome ?? postagem.nomeAutor ?? null,
          quantidadeCurtidas: postagem.qtdCurtidas ?? postagem.contagemCurtidas,
          quantidadeComentarios: postagem.qtdComentarios ?? postagem.contagemComentarios,
          curtidaPeloUsuario:
            postagem.curtido ?? postagem.curtidoPeloUsuario ?? postagem.usuarioCurtiu ?? false,
        };
        this.detectorAlteracoes.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar detalhes da postagem', erro);
      },
    });
  }

  alternarCurtida() {
    const identificadorPostagem = this.postagemDetalhada?.id;
    if (!identificadorPostagem || !this.postagemDetalhada) {
      return;
    }

    const curtidaAnterior = this.postagemDetalhada.curtidaPeloUsuario;
    const curtidasAntes = this.postagemDetalhada.quantidadeCurtidas;
    const variacaoCurtidas = curtidaAnterior ? -1 : 1;

    this.postagemDetalhada.curtidaPeloUsuario = !curtidaAnterior;
    this.postagemDetalhada.quantidadeCurtidas = Math.max(0, curtidasAntes + variacaoCurtidas);
    this.detectorAlteracoes.detectChanges();

    const requisicao$ = curtidaAnterior
      ? this.servicoPostagens.descurtirPostagem(identificadorPostagem)
      : this.servicoPostagens.curtirPostagem(identificadorPostagem);

    requisicao$.subscribe({
      next: (retorno) => {
        if (!this.postagemDetalhada) {
          return;
        }

        if (typeof retorno?.liked === 'boolean') {
          this.postagemDetalhada.curtidaPeloUsuario = retorno.liked;
        }
        if (typeof retorno?.likesCount === 'number') {
          this.postagemDetalhada.quantidadeCurtidas = retorno.likesCount;
        }
        this.detectorAlteracoes.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao atualizar curtida', erro);
        if (!this.postagemDetalhada) {
          return;
        }
        this.postagemDetalhada.curtidaPeloUsuario = curtidaAnterior;
        this.postagemDetalhada.quantidadeCurtidas = curtidasAntes;
        this.detectorAlteracoes.detectChanges();
      },
    });
  }

  abrirDialogoComentario() {
    this.textoComentario = '';
    this.dialogoComentarioAberto = true;
    this.detectorAlteracoes.detectChanges();
  }

  fecharDialogoComentario() {
    this.dialogoComentarioAberto = false;
    this.textoComentario = '';
    this.detectorAlteracoes.detectChanges();
  }

  registrarComentario() {
    console.log('Comentário pendente de implementação:', this.postagemDetalhada?.id, this.textoComentario);
    this.fecharDialogoComentario();
  }

  voltarParaListagem() {
    this.roteador.navigate(['/postagens']);
  }
}
