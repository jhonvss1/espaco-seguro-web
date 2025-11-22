import { Component, Input } from '@angular/core';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
  selector: 'postagem-card',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './postagem-card.component.html',
  styleUrl: './postagem-card.component.scss',
})
export class PostagemCardComponent {
  @Input() autor = '';
  @Input() tempo = '';
  @Input() texto = '';
  @Input() likes = 0;
  @Input() comentarios = 0;
}
