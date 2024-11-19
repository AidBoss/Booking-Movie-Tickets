import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { login_inter } from "../../../core/models/auth.model";
import { AuthService } from "../../../core/services/api/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  authService = inject(AuthService);
  router = inject(Router);
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$')]],
    });
  }

  getError(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (control?.errors) {
      if (control.errors['required']) {
        return 'Trường này là bắt buộc.';
      } else if (control.errors['minlength']) {
        return `Độ dài phải ít nhất ${control.errors['minlength'].requiredLength} ký tự.`;
      } else if (control.errors['pattern']) {
        return 'Phải chứa cả chữ cái và số.';
      }
    }
    return '';
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData: login_inter = this.loginForm.value;
      this.authService.login(loginData).subscribe({
        next: () => this.router.navigate(['/admin']),
        error: (error: any) => {
          this.errorMessage = error.error;
        }
      });
    } else {
      this.errorMessage = 'Form lỗi rồi bạn ơi.';
      this.loginForm.markAllAsTouched();
    }
  }
}
