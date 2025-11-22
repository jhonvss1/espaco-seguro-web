import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sessao-status',
  standalone: true,
  imports: [CommonModule],
  template: `<span class="status" [ngClass]="statusClass">{{ label }}</span>`,
  styleUrl: './sessao-status.component.scss',
})
export class SessaoStatusComponent {
  @Input() status: 'Em andamento' | 'Respondida' | 'Nova' = 'Em andamento';

  get label() {
    return this.status;
  }

  get statusClass() {
    return this.status.toLowerCase().replace(' ', '-');
  }
}
