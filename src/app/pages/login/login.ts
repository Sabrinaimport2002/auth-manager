import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/authService.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { MaterialModules } from '../../shared/material/material.modules';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, MaterialModules],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  readonly authService = inject(AuthService);
  readonly router = inject(Router);
  readonly notificationService = inject(NotificationService);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  hidePassword = true;

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    const email = this.loginForm.value.email || '';
    const password = this.loginForm.value.password || '';

    const user = this.authService.login(email, password)

    if (user) {
      this.notificationService.showSuccess('Login realizado com sucesso! Bem-vindo de volta!');
      this.router.navigate(['/dashboard']);
    }
    else {
      this.notificationService.showError('Email ou senha inválidos. Tente novamente.');
    }
  }
}
