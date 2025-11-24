import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CardService } from '../../../../core/services/cardService';

interface CriarConteudoModel {
  titulo: string;
  resumo: string;
  corpo: string;
  tipo: 'texto' | 'infografico' | 'video';
  urlMidia: string;
  
}

@Component({
  selector: 'app-criar-conteudo',
  standalone: true,
  imports: [NavbarComponent, CardComponent, ButtonComponent, FormsModule, RouterLink, CommonModule],
  templateUrl: './criar-conteudo.component.html',
  styleUrl: './criar-conteudo.component.scss',
})
export class CriarConteudoComponent {
  model: CriarConteudoModel = {
    titulo: '',
    resumo: '',
    corpo: '',
    tipo: 'texto',
    urlMidia: '',    
  };

  constructor(private router: Router, private cardService: CardService) {}

  onSubmit() {
    const payload = {
      titulo: this.model.titulo,
      resumo: this.model.resumo,
      corpo: this.model.corpo,
      tipo: this.model.tipo,
      urlMidia: this.model.urlMidia,
    };

    this.cardService.criarCard(payload).subscribe({
      next: (response) => {
        console.log('Conteúdo criado com sucesso', response);
        this.router.navigate(['/conteudos']);
      },
      error: (error) => {
        console.error('Erro ao criar conteúdo', error);
      },
    });
  }
}

