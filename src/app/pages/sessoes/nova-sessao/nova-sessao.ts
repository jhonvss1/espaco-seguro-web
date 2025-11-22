import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface NovaSessaoModel {
  titulo: string;
  descricao: string;
  tags: string;
  modo: 'anonimo' | 'perfil';
}

@Component({
  selector: 'legacy-nova-sessao',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './nova-sessao.html',
  styleUrl: './nova-sessao.css',
})
export class NovaSessao {
  model: NovaSessaoModel = {
    titulo: '',
    descricao: '',
    tags: '',
    modo: 'anonimo',
  };

  constructor(private router: Router) {}

  onSubmit() {
    this.router.navigate(['/sessoes']);
  }
}
