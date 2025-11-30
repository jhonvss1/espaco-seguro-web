import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { PostagemCardComponent } from '../../components/postagem-card/postagem-card.component';
import { PostagensService } from '../../../../core/services/postagens.service';

interface DadosFormularioPostagem {
  autorId: string;
  conteudo: string;
  anonimo: boolean;
}

interface PostagemApresentacao {
  id: string;
  conteudo: string;
  dataPublicacao: string;
  quantidadeCurtidas: number;
  quantidadeComentarios: number;
  anonimo: boolean;
  curtidaPeloUsuario: boolean;
}

@Component({
  selector: 'app-feed-postagens',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    CardComponent,
    ButtonComponent,
    PostagemCardComponent,
  ],
  templateUrl: './feed-postagens.component.html',
  styleUrl: './feed-postagens.component.scss',
})
export class FeedPostagensComponent implements OnInit {
  postagensApresentacao: PostagemApresentacao[] = [];
  dialogoComentarioAberto = false;
  postagemComComentario: PostagemApresentacao | null = null;
  textoComentario = '';

  formularioPostagem: DadosFormularioPostagem = {
    autorId: '',
    conteudo: '',
    anonimo: false,
  };

  constructor(
    private servicoPostagens: PostagensService,
    private roteador: Router,
    private detectorAlteracoes: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.carregarPostagens();
  }

  private carregarPostagens() {
    this.servicoPostagens.listarPostagens().subscribe({
      next: (postagens) => {
        this.postagensApresentacao = postagens.map((postagem) => ({
          id: postagem.id,
          conteudo: postagem.conteudo,
          dataPublicacao: postagem.dataPublicacao,
          quantidadeComentarios: postagem.contagemComentarios,
          quantidadeCurtidas: postagem.contagemCurtidas,
          anonimo: postagem.anonimo,
          curtidaPeloUsuario:
            postagem.curtido ?? postagem.curtidoPeloUsuario ?? postagem.usuarioCurtiu ?? false,
        }));
        this.detectorAlteracoes.detectChanges();
      },
      error: () => {
        console.error('Erro ao listar postagens.');
      },
    });
  }

  abrirDetalhePostagem(postagemId: string) {
    this.roteador.navigate(['/postagens', postagemId]);
  }

  abrirDialogoComentario(postagem: PostagemApresentacao) {
    this.postagemComComentario = postagem;
    this.textoComentario = '';
    this.dialogoComentarioAberto = true;
    this.detectorAlteracoes.detectChanges();
  }

  fecharDialogoComentario() {
    this.dialogoComentarioAberto = false;
    this.postagemComComentario = null;
    this.textoComentario = '';
    this.detectorAlteracoes.detectChanges();
  }

  registrarComentario() {
    console.log('Comentário pendente de implementação:', this.postagemComComentario?.id, this.textoComentario);
    this.fecharDialogoComentario();
  }

  alternarCurtida(postagem: PostagemApresentacao) {
    if (!postagem?.id) {
      return;
    }

    const curtidaAnterior = postagem.curtidaPeloUsuario;
    const curtidasAntes = postagem.quantidadeCurtidas;
    const variacaoCurtidas = curtidaAnterior ? -1 : 1;

    postagem.curtidaPeloUsuario = !curtidaAnterior;
    postagem.quantidadeCurtidas = Math.max(0, curtidasAntes + variacaoCurtidas);
    this.detectorAlteracoes.detectChanges();

    const requisicao$ = curtidaAnterior
      ? this.servicoPostagens.descurtirPostagem(postagem.id)
      : this.servicoPostagens.curtirPostagem(postagem.id);

    requisicao$.subscribe({
      next: (retorno) => {
        if (typeof retorno?.liked === 'boolean') {
          postagem.curtidaPeloUsuario = retorno.liked;
        }
        if (typeof retorno?.likesCount === 'number') {
          postagem.quantidadeCurtidas = retorno.likesCount;
        }
        this.detectorAlteracoes.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao atualizar curtida', erro);
        postagem.curtidaPeloUsuario = curtidaAnterior;
        postagem.quantidadeCurtidas = curtidasAntes;
        this.detectorAlteracoes.detectChanges();
      },
    });
  }

  aoEnviarPostagem() {
    const dadosPostagem = {
      conteudo: this.formularioPostagem.conteudo,
      anonimo: this.formularioPostagem.anonimo,
    };

    this.servicoPostagens.criarPostagem(dadosPostagem).subscribe({
      next: () => {
        this.formularioPostagem.conteudo = '';
        this.formularioPostagem.anonimo = false;
        this.carregarPostagens();
      },
    });
  }
}
