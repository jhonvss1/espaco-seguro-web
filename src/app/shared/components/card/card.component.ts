import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="ui-card" [ngClass]="padding" [routerLink]="routerLink">
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() padding: 'sm' | 'md' | 'lg' = 'md';
  @Input() routerLink?: string | any[];
}
