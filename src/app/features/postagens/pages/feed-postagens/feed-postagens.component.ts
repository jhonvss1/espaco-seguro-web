import { Component } from '@angular/core';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { PostagemCardComponent } from '../../components/postagem-card/postagem-card.component';

@Component({
  selector: 'app-feed-postagens',
  standalone: true,
  imports: [NavbarComponent, CardComponent, ButtonComponent, PostagemCardComponent],
  templateUrl: './feed-postagens.component.html',
  styleUrl: './feed-postagens.component.scss',
})
export class FeedPostagensComponent {}
