import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLogin = true;

  email = '';
  password = '';
  name = '';
  errorMessage = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  submit(): void {
    this.errorMessage = '';
    this.loading = true;

    if (this.isLogin) {
      this.authService.login({ email: this.email, password: this.password }).subscribe({
        next: () => this.router.navigate(['/hotels']),
        error: () => {
          this.errorMessage = 'Email ou senha inválidos.';
          this.loading = false;
        }
      });
    } else {
      this.authService.register({ name: this.name, email: this.email, password: this.password }).subscribe({
        next: () => this.router.navigate(['/hotels']),
        error: err => {
          this.errorMessage = err.error?.message || 'Erro ao criar conta. Verifique os dados.';
          this.loading = false;
        }
      });
    }
  }

  toggleMode(): void {
    this.isLogin = !this.isLogin;
    this.errorMessage = '';
  }
}
