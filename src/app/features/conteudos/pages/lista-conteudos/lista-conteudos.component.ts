import { Component } from '@angular/core';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../../shared/components/card/card.component';

@Component({
  selector: 'app-lista-conteudos',
  standalone: true,
  imports: [NavbarComponent, CardComponent],
  templateUrl: './lista-conteudos.component.html',
  styleUrl: './lista-conteudos.component.scss',
})
export class ListaConteudosComponent {}
