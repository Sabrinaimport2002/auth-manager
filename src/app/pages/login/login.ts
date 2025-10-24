import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/authService.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { MaterialModules } from '../../shared/material/material.modules';
import { NotificationService } from '../../core/services/notification.service';
import { LoadingOverlayComponent } from '../../shared/components/loading-overlay/loading-overlay';
import { InputComponent } from '../../shared/components/input/input';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, MaterialModules, LoadingOverlayComponent, InputComponent],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  readonly authService = inject(AuthService);
  readonly router = inject(Router);
  readonly notificationService = inject(NotificationService);
  isLoading = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  get emailControl() {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl() {
    return this.loginForm.get('password') as FormControl;
  }

  onSubmit() {
    this.isLoading = true;
    const email = this.loginForm.value.email || '';
    const password = this.loginForm.value.password || '';

    this.authService.login({ email, password }).subscribe({
      next: () => {
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
