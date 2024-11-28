import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {register_inter} from "../../../core/models/auth.model";
import {AuthService} from "../../../core/services/api/auth.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = '';
  authService = inject(AuthService)
  router = inject(Router)

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      fullname: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(5),]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^\\d{10,11}$')]],
      pw: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$')]],
        confirmPassword: ['', [Validators.required]]
      })
    }, {validator: this.passwordMatchValidator});
  }

  ngOnInit(): void {
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('pw.password')?.value === form.get('pw.confirmPassword')?.value ? null : {'mismatch': true};
  }

  getError(controlName: string): string {
    const control = this.registerForm.get(controlName);
    if (control?.errors) {
      if (control.errors['required']) {
        return 'Trường này là bắt buộc.';
      } else if (control.errors['minlength']) {
        return `Độ dài phải ít nhất ${control.errors['minlength'].requiredLength} ký tự.`;
      } else if (control.errors['pattern']) {
        return 'Phải chứa cả chữ cái và số.';
      } else if (control.errors['email']) {
        return 'Email không hợp lệ.';
      } else if (control.errors['mismatch']) {
        return 'Mật khẩu và Xác nhận mật khẩu không khớp.';
      }
    }
    return '';
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      const data: register_inter = {
        fullname: formValue.fullname,
        username: formValue.username,
        email: formValue.email,
        phone: formValue.phone,
        password: formValue.pw.password
      };
      this.authService.register(data).subscribe({
        next: () => {
          this.router.navigate(['/login']);
          this.errorMessage = "Bạn đã đăng ký thành công"
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage = error.error.message;
        }
      })
    } else {
      this.errorMessage = 'Form lỗi rồi bạn ơi.';
      this.registerForm.markAllAsTouched();
    }
  }
}
