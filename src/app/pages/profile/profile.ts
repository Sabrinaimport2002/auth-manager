import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/authService.service';
import { NotificationService } from '../../core/services/notification.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../core/validators/password-match.validator';
import { MaterialModules } from '../../shared/material/material.modules';
import { passwordStrengthValidator } from '../../core/validators/password-strength.validator';
import { LoadingOverlay } from '../../shared/components/loading-overlay/loading-overlay';

@Component({
  selector: 'app-profile',
  imports: [MaterialModules, ReactiveFormsModule, LoadingOverlay],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {

  isLoading = false;

  readonly authService = inject(AuthService);
  readonly notificationService = inject(NotificationService);

  currentUser = this.authService.getCurrentUser();

  profileForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  // Formulário de troca de senha
  passwordForm = new FormGroup(
    {
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        passwordStrengthValidator(),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: passwordMatchValidator('newPassword', 'confirmPassword') }
  );

  hideCurrentPassword = true;
  hideNewPassword = true;
  hideConfirmPassword = true;

  ngOnInit() {
    this.isLoading = true;
    if (this.currentUser) {
      this.profileForm.patchValue({
        name: this.currentUser?.name || '',
        email: this.currentUser?.email || '',
      });
      this.isLoading = false;
    }
  }

  toggleCurrentPasswordVisibility() {
    this.hideCurrentPassword = !this.hideCurrentPassword;
  }

  toggleNewPasswordVisibility() {
    this.hideNewPassword = !this.hideNewPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  updateProfile() {
    this.isLoading = true;
    if (this.profileForm.valid) {
      const name = this.profileForm.value.name || '';
      const email = this.profileForm.value.email || '';

      this.authService.updateProfile({ name, email }).subscribe({
        next: () => {
          this.isLoading = false;
          this.currentUser = this.authService.getCurrentUser();
          this.notificationService.showSuccess('Perfil atualizado com sucesso!');
        },
        error: (error) => {
          this.isLoading = false;
          this.notificationService.showError(
            error.message || 'Erro ao atualizar perfil. Tente novamente.'
          );
        },
      });
    }
  }

  changePassword() {
    this.isLoading = true
    if (this.passwordForm.valid) {
      const currentPassword = this.passwordForm.value.currentPassword || '';
      const newPassword = this.passwordForm.value.newPassword || '';

      this.authService.changePassword(currentPassword, newPassword).subscribe({
        next: () => {
          this.isLoading = false
          this.notificationService.showSuccess('Senha alterada com sucesso!');
          this.passwordForm.reset();

          // Reseta a visibilidade das senhas
          this.hideCurrentPassword = true;
          this.hideNewPassword = true;
          this.hideConfirmPassword = true;
        },
        error: (error) => {
          this.isLoading = false;
          this.notificationService.showError(
            error.message || 'Erro ao alterar senha. Tente novamente.'
          );
        },
      });
    }
  }
}
