import { Component } from '@angular/core';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { SessaoStatusComponent } from '../../components/sessao-status/sessao-status.component';

@Component({
  selector: 'app-detalhe-sessao',
  standalone: true,
  imports: [NavbarComponent, CardComponent, ButtonComponent, SessaoStatusComponent],
  templateUrl: './detalhe-sessao.component.html',
  styleUrl: './detalhe-sessao.component.scss',
})
export class DetalheSessaoComponent {}
