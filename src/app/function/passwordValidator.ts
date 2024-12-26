import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    // Check for uppercase letter
    const hasUpperCase = /[A-Z]/.test(value);

    // Check for lowercase letter
    const hasLowerCase = /[a-z]/.test(value);

    // Check for numeric character
    const hasNumeric = /[0-9]/.test(value);

    // Check for special character
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    // Final check to ensure all conditions are met
    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

    // Return validation result
    return !passwordValid ? { passwordStrength: true } : null;
  };
}
