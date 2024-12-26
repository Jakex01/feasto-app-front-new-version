import {Component, signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {merge} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {passwordValidator} from "../function/passwordValidator";
import {sign} from "chart.js/helpers";

@Component({
  selector: 'app-register-final-version',
  templateUrl: './register-final-version.component.html',
  styleUrls: ['./register-final-version.component.css']
})
export class RegisterFinalVersionComponent {
  loginForm: FormGroup;
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  readonly password = new FormControl('',
    [Validators.required,
      Validators.minLength(10),
      passwordValidator()
    ])
  errorMessageEmail = signal('');
  errorMessagePassword = signal('');
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  constructor(private fb: FormBuilder) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(10), passwordValidator()]]
    });

    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessageEmail());

    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessagePassword());

  }

  updateErrorMessageEmail() {
    if (this.email.hasError('required')) {
      this.errorMessageEmail.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessageEmail.set('Not a valid email');
    } else if(this.email.hasError('passwordStrength')){
      this.errorMessageEmail.set('Not enough strong');
    } else {
      this.errorMessageEmail.set('');
    }
  }
  updateErrorMessagePassword() {
    if (this.password.hasError('required')) {
      this.errorMessagePassword.set('You must enter a value');
    } else if (this.password.hasError('minlength')) {
      this.errorMessagePassword.set('Password must be longer than 10 characters');
    } else if(this.password.hasError('passwordStrength')) {
      this.errorMessagePassword.set('Not enough strong');
    } else {
      this.errorMessagePassword.set('');
    }
  }

  loginWithFacebook() {
    // Facebook login logic
  }

  loginWithGoogle() {
    // Google login logic
  }

  loginWithLinkedIn() {
    // LinkedIn login logic
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      // Handle form data submission here
      console.log('Form submitted successfully', formData);
    } else {
      console.log('Form is invalid');
    }
  }

  signUp() {

  }
}
