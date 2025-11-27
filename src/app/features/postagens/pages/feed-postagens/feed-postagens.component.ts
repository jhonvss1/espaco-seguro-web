import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { PostagemCardComponent } from '../../components/postagem-card/postagem-card.component';
import { PostagensService } from '../../../../core/services/postagens.service';
import { Router } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { ChangeDetectorRef } from '@angular/core';

interface CriarPostagem  {
  autorId: string;
  conteudo: string;
  anonimo: boolean;
}

//tenho que implementar uma forma de trazer o nome do usuario pelo menos pra mostrar, caso nao seja anonimo.
interface PostagemView {
  id: string;
  conteudo: string;
  dataPublicacao: string;
  qtdCurtidas: number;
  qtdComentarios: number;
  anonimo: boolean;
}


@Component({
  selector: 'app-feed-postagens',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CardComponent, ButtonComponent, PostagemCardComponent, FormsModule],
  templateUrl: './feed-postagens.component.html',
  styleUrl: './feed-postagens.component.scss',
})
export class FeedPostagensComponent implements OnInit {

  postagens: PostagemView[] = []

  model: CriarPostagem= {
    autorId: '',
    conteudo: '',
    anonimo: false,
  }

  constructor(private postagemService: PostagensService, private router: Router, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.loadPostagens();
  }

  private loadPostagens(){
    this.postagemService.listarPostagens().subscribe({
      next: (postagens: any[]) => {
        console.log('Postagens recebidas da API:', postagens);
        this.postagens = postagens.map((p) => ({
          id: p.id,
          conteudo: p.conteudo,
          dataPublicacao: p.dataPublicacao,
          qtdComentarios: p.contagemComentarios,
          qtdCurtidas: p.contagemCurtidas,
          anonimo: p.anonimo,
        }));
        console.log('Postagens mapeadas para view:', this.postagens); //visualziar quantas chamadas estao tendo pra minha api pra nao pesar performance
        
      },
      error: () => {
        console.log('Erro ao trazer postagens.');
      }
    })
    } 

  OnSubmit(){
    const payload = {
      conteudo: this.model.conteudo,
      anonimo: this.model.anonimo
    }

    this.postagemService.criarPostagem(payload).subscribe({
      next: response => {
        console.log('Criado com sucesso!', response)
        this.router.navigate(['/postagens'])
        this.loadPostagens();
      }
      
    })
  }
}
