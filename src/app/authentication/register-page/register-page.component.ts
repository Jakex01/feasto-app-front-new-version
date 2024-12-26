import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationResponse} from "../../model/response/AuthenticationResponse";
import {VerificationRequest} from "../../model/request/VerificationRequest";
import {RegisterRequest} from "../../model/request/RegisterRequest";
import {AuthenticationService} from "../../service/authentication-service/authentication.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit{

  authResponse: AuthenticationResponse = {
    accessToken: '',
    mfaEnabled: false,
    secretImageUri: ''
  };

  verificationRequest: VerificationRequest = {
    email: "",
    code: ""
  }

  registerRequest: RegisterRequest = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "USER",
    mfaEnabled: false
  }
  registerForm: FormGroup;
  message = '';
  isMfaSetup = false;
  verificationCode = "";
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder

  ) { }


  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('[A-Za-z]+'), Validators.minLength(2), Validators.maxLength(50)]],
      lastname: ['', [Validators.required, Validators.pattern('[A-Za-z]+'), Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
      mfaEnabled: [false]
    });
  }

  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.value;

    // Return null if no value is provided (to allow Validators.required to handle it)
    if (!password) {
      return null;
    }

    // Regex to validate password requirements
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Check if password matches the regex
    if (!regex.test(password)) {
      return { weakPassword: true };
    }

    // If all conditions are met, return null (valid password)
    return null;
  }
  hidePassword = true; // Initial state: password hidden

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
  registerUser(): void {
    this.authService.register(this.registerRequest)
      .subscribe({
        next: (response) => {
          if (response) {
            console.log(response);
            this.authResponse = response;
            this.isMfaSetup = true;
            this.message = 'MFA setup in progress.';
          } else {
            this.message = 'Account created successfully.';
            setTimeout(() => {
              this.router.navigate(['login']);
            }, 3000);
          }
        },
        error: (err) => {
          this.message = 'Registration failed. Please try again later.';
          console.error(err);
        }
      });
  }
  verifyMfaCode() {
    this.message = '';
    this.verificationRequest.email = this.registerRequest.email;
    this.verificationRequest.code = this.verificationCode;
    this.authService.verifyCode(this.verificationRequest)
      .subscribe({
        next: (response) => {
          this.message = 'Account created successfully\nYou will be redirected to the Welcome page in 3 seconds';
          setTimeout(() => {
            localStorage.setItem('token', response.accessToken as string);
            this.router.navigate(['main']);
          }, 3000);
        }
      });
  }
}
