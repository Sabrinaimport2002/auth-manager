import { Component, Input } from '@angular/core';
import { MaterialModules } from '../../material/material.modules';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  imports: [MaterialModules, ReactiveFormsModule, CommonModule],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class InputComponent {
  @Input() type: string = 'text';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() icon?: string = '';
  @Input() control!: FormControl;
  @Input() showPasswordToggle: boolean = false;

  hidePassword: boolean = true;

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  get inputType(): string {
    if (this.type === 'password' && this.showPasswordToggle) {
      return this.hidePassword ? 'password' : 'text';
    }
    return this.type;
  }
}
