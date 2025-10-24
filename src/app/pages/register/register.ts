import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/authService.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { MaterialModules } from '../../shared/material/material.modules';
import { NotificationService } from '../../core/services/notification.service';
import { passwordMatchValidator } from '../../core/validators/password-match.validator';
import { passwordStrengthValidator } from '../../core/validators/password-strength.validator';
import { LoadingOverlay } from '../../shared/components/loading-overlay/loading-overlay';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, MaterialModules, LoadingOverlay
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  isLoading = false;

  readonly authService = inject(AuthService);
  readonly router = inject(Router);
  readonly notificationService = inject(NotificationService);
  

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), passwordStrengthValidator()]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, { validators: passwordMatchValidator('password', 'confirmPassword') }
  );

  hidePassword = true;
  hideConfirmPassword = true;

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  onSubmit() {
    this.isLoading = true
    const name = this.registerForm.value.name || '';
    const email = this.registerForm.value.email || '';
    const password = this.registerForm.value.password || '';

    this.authService.register({ email: email, password: password, name: name }).subscribe({
      next: () => {
        this.isLoading = false;
        this.notificationService.showSuccess('Cadastro realizado com sucesso! Faça login para continuar.');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.isLoading = false;
        this.notificationService.showError(error.message || 'Email já cadastrado. Tente outro email ou faça login.');
      }
    })
  }
}
