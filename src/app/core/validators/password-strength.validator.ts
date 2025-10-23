import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const password = control.value;
        const errors: ValidationErrors = {};

        // Se não tiver valor, não valida
        if (!password)
            return null;

        // Verifica se a senha é forte
        if(!/[A-Z]/.test(password))
            errors['uppercase'] = true;

        if(!/[0-9]/.test(password))
            errors['lowercase'] = true

        if (!/[0-9]/.test(password))
            errors['number'] = true;

        if(!/[!@#$%^&*(),.?":{}|<>]/.test(password))
            errors['special'] = true;

        return Object.keys(errors).length > 0 ? { passwordStrength: errors } : null;
    }
}