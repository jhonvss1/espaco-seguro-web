import { Component, Input } from '@angular/core';

@Component({
  selector: 'comentario-item',
  standalone: true,
  templateUrl: './comentario.component.html',
  styleUrl: './comentario.component.scss',
})
export class ComentarioComponent {
  @Input() autor = '';
  @Input() texto = '';
}
