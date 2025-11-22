import { Component } from '@angular/core';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ComentarioComponent } from '../../components/comentario/comentario.component';

@Component({
  selector: 'app-detalhe-postagem',
  standalone: true,
  imports: [NavbarComponent, CardComponent, ButtonComponent, ComentarioComponent],
  templateUrl: './detalhe-postagem.component.html',
  styleUrl: './detalhe-postagem.component.scss',
})
export class DetalhePostagemComponent {}
