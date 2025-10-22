import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/authService.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { MaterialModules } from '../../shared/material/material.modules';
import { NotificationService } from '../../core/services/notification.service';
import { passwordMatchValidator } from '../../core/validators/password-match.validator';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, MaterialModules],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  readonly authService = inject(AuthService);
  readonly router = inject(Router);
  readonly notificationService = inject(NotificationService);
  

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
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
    const name = this.registerForm.value.name || '';
    const email = this.registerForm.value.email || '';
    const password = this.registerForm.value.password || '';

    const user = this.authService.register({ email: email, password: password, name: name });

    if (user) {
      this.notificationService.showSuccess('Cadastro realizado com sucesso! Faça login para continuar.');
      this.router.navigate(['/login']);
    }
    else {
      this.notificationService.showError('Email já cadastrado. Tente outro email ou faça login.');
    }
  }
}
