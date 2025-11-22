import { Component } from '@angular/core';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
  selector: 'app-detalhe-conteudo',
  standalone: true,
  imports: [NavbarComponent, CardComponent],
  templateUrl: './detalhe-conteudo.component.html',
  styleUrl: './detalhe-conteudo.component.scss',
})
export class DetalheConteudoComponent {}
