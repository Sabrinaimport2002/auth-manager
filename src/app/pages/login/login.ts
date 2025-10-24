import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/authService.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { MaterialModules } from '../../shared/material/material.modules';
import { NotificationService } from '../../core/services/notification.service';
import { LoadingOverlay } from '../../shared/components/loading-overlay/loading-overlay';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, MaterialModules, LoadingOverlay],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  readonly authService = inject(AuthService);
  readonly router = inject(Router);
  readonly notificationService = inject(NotificationService);
  hidePassword = true;
  isLoading = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })


  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    this.isLoading = true;
    const email = this.loginForm.value.email || '';
    const password = this.loginForm.value.password || '';

    this.authService.login({ email, password }).subscribe({
      next: (user) => {
        this.isLoading = false;
        this.notificationService.showSuccess('Login realizado com sucesso! Bem-vindo de volta!');
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.isLoading = false;
        this.notificationService.showError(error.message || 'Erro ao realizar login. Tente novamente.');
      }
    })
  }
}
