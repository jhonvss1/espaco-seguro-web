import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
  selector: 'app-nova-sessao',
  standalone: true,
  imports: [ButtonComponent, InputComponent, NavbarComponent, CardComponent],
  templateUrl: './nova-sessao.component.html',
  styleUrl: './nova-sessao.component.scss',
})
export class NovaSessaoComponent {}
