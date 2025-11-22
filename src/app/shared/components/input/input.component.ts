import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label class="ui-input">
      <span *ngIf="label" class="label">{{ label }}</span>
      <input
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        [attr.name]="name"
      />
    </label>
  `,
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: string = 'text';
  @Input() value: string = '';
  @Input() name?: string;
}
