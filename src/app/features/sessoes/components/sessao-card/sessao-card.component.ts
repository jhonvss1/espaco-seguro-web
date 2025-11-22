import { Component, Input } from '@angular/core';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { SessaoStatusComponent } from '../sessao-status/sessao-status.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'sessao-card',
  standalone: true,
  imports: [CardComponent, SessaoStatusComponent, RouterLink],
  templateUrl: './sessao-card.component.html',
  styleUrl: './sessao-card.component.scss',
})
export class SessaoCardComponent {
  @Input() titulo = '';
  @Input() status: 'Em andamento' | 'Respondida' = 'Em andamento';
  @Input() resumo = '';
  @Input() link = '';
}
