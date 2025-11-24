import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CardService } from '../../../../core/services/cardService';

interface ConteudoCardView {
  id: string;
  titulo: string;
  resumo: string;
  tipo: 'texto' | 'infografico' | 'video';
  urlMidia?: string;
  dataPublicacao?: string;
}

@Component({
  selector: 'app-lista-conteudos',
  standalone: true,
  imports: [NavbarComponent, CardComponent, RouterLink, CommonModule, ButtonComponent],
  templateUrl: './lista-conteudos.component.html',
  styleUrl: './lista-conteudos.component.scss',
})
export class ListaConteudosComponent {
  conteudos: ConteudoCardView[] = [];

  constructor(private cardService: CardService, private cdr: ChangeDetectorRef) {
    this.loadCards();
  }

  private loadCards() {
    this.cardService.listarCards().subscribe({
      next: (cards: any[]) => {        
        this.conteudos = cards.map((c) => ({
          id: c.id,
          titulo: c.titulo,
          resumo: c.resumo,
          tipo: c.tipo,
          urlMidia: c.urlMidia,
          dataPublicacao: c.dataPublicacao,
        }));
        this.cdr.detectChanges();// captar mudanças e atualizar a view
      },
      error: (error) => {
        console.error('Erro ao carregar conteúdos', error);
      },
    });
  }
}
