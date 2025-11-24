import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { CardService } from '../../../../core/services/cardService';

interface ConteudoDetalheView {
  id: string;
  titulo: string;
  corpo: string;
  tipo: string;
  urlMidia?: string;
  dataPublicacao?: string | null;
}

@Component({
  selector: 'app-detalhe-conteudo',
  standalone: true,
  imports: [NavbarComponent, CardComponent, CommonModule, DatePipe],
  templateUrl: './detalhe-conteudo.component.html',
  styleUrl: './detalhe-conteudo.component.scss',
})
export class DetalheConteudoComponent {
  conteudo: ConteudoDetalheView = {
    id: '',
    titulo: '',
    corpo: '',
    tipo: '',
    urlMidia: '',
    dataPublicacao: null,
  };
  paragrafos: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private cardService: CardService,
    private cdr: ChangeDetectorRef,
  ) {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.loadCard(id);
      }
    });
  }

  private loadCard(id: string) {
    console.log('Buscando card id', id);
    this.cardService.obterCardPorId(id).subscribe({
      next: (c: any) => {
        console.log('Card recebido', c);
        this.conteudo = {
          id: c.id,
          titulo: c.titulo,
          corpo: c.corpo,
          tipo: c.tipo,
          urlMidia: c.urlMidia,
          dataPublicacao: c.dataPublicacao,
        };
        this.paragrafos = (c.corpo ?? '').toString().split('\n');
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erro ao carregar conteúdo', error);
      },
    });
  }
}
