import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AuthService } from '../../../core/services/auth.service';

interface CadastroModel {
  nome: string;
  dataNascimento: string;
  email: string;
  cpf: string;
  telefone: string;
  senha: string;
  confirmarSenha: string;
  aceitaTermos: boolean;
}

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [RouterLink, FormsModule, ButtonComponent],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  
  model: CadastroModel = {
    nome: '',
    dataNascimento: '',
    email: '',
    cpf: '',
    telefone: '',
    senha: '',
    confirmarSenha: '',
    aceitaTermos: false,
  };

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.cadastrarUsuario(this.model).subscribe({
      next: (response) => {
        console.log('Cadastro realizado com sucesso', response);
      },
      error: (error) => {
        console.error('Erro ao cadastrar usuário', error);
      },
    });
  }
}

