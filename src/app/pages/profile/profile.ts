import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/authService.service';
import { NotificationService } from '../../core/services/notification.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../core/validators/password-match.validator';
import { MaterialModules } from '../../shared/material/material.modules';

@Component({
  selector: 'app-profile',
  imports: [MaterialModules, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {
  readonly authService = inject(AuthService);
  readonly notificationService = inject(NotificationService);

  currentUser = this.authService.getCurrentUser();

  profileForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  // Formulário de troca de senha
  passwordForm = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  }, { validators: passwordMatchValidator('newPassword', 'confirmPassword') });

  hideCurrentPassword = true;
  hideNewPassword = true;
  hideConfirmPassword = true;

  ngOnInit() {
    if (this.currentUser) {
      this.profileForm.patchValue({
        name: this.currentUser?.name || '',
        email: this.currentUser?.email || '',
      });
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
    if (this.profileForm.valid) {
      const name = this.profileForm.value.name || '';
      const email = this.profileForm.value.email || '';
      
      const result = this.authService.updateProfile(name, email);
      
      if (result.success) {
        // Atualiza a variável local com os novos dados
        this.currentUser = this.authService.getCurrentUser();
        this.notificationService.showSuccess(result.message);
        
      } else {
        this.notificationService.showError(result.message);
      }
    }
  }
  
  changePassword() {
    if (this.passwordForm.valid) {
      const currentPassword = this.passwordForm.value.currentPassword || '';
      const newPassword = this.passwordForm.value.newPassword || '';
      
      const result = this.authService.changePassword(currentPassword, newPassword);
      
      if (result.success) {
        this.notificationService.showSuccess(result.message);
        this.passwordForm.reset();
        
        // Reseta a visibilidade das senhas
        this.hideCurrentPassword = true;
        this.hideNewPassword = true;
        this.hideConfirmPassword = true;
      } else {
        this.notificationService.showError(result.message);
      }
    }
  }
}
