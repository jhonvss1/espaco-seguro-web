import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

interface LoginModel {
  email: string;
  senha: string;
}


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

model: LoginModel = {
email: '',
senha: ''
};


mensagem: string | null = null;
erro: string | null = null;

private router = inject(Router);
private authService = inject(AuthService);

constructor() {
  if (this.authService.isAuthenticated()) {
    this.router.navigate(['/']);
  }
}

onSubmit() {
  this.mensagem = null;
  this.erro = null;
  this.authService.loginUsuario(this.model).subscribe({
    next: () => {
      console.log('Login realizado com sucesso');
      this.mensagem = 'Login realizado com sucesso!';
      this.router.navigate(['/']);
    },
    error: (error) => {
      console.error('Erro ao realizar login', error);
      this.erro = 'Não foi possível entrar. Verifique suas credenciais.';
    }
  })
}

}
