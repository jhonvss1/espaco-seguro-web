import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
  selector: 'postagem-card',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './postagem-card.component.html',
  styleUrl: './postagem-card.component.scss',
})
export class PostagemCardComponent {
  @Input() autor = '';
  @Input() tempo = '';
  @Input() texto = '';
  @Input() likes = 0;
  @Input() comentarios = 0;
  @Input() curtido = false;

  @Output() alternarCurtida = new EventEmitter<void>();
  @Output() solicitarComentarios = new EventEmitter<void>();
  @Output() abrirDetalhes = new EventEmitter<void>();

  emitirAlternanciaCurtida(evento: MouseEvent) {
    evento.stopPropagation();
    this.alternarCurtida.emit();
  }

  emitirSolicitacaoComentarios(evento: MouseEvent) {
    evento.stopPropagation();
    this.solicitarComentarios.emit();
  }

  emitirAberturaDetalhes(evento: MouseEvent) {
    evento.stopPropagation();
    this.abrirDetalhes.emit();
  }
}
