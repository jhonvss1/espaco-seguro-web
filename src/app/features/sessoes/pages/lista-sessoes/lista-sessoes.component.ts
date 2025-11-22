import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { SessaoCardComponent } from '../../components/sessao-card/sessao-card.component';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-lista-sessoes',
  standalone: true,
  imports: [ButtonComponent, SessaoCardComponent, NavbarComponent],
  templateUrl: './lista-sessoes.component.html',
  styleUrl: './lista-sessoes.component.scss',
})
export class ListaSessoesComponent {}
