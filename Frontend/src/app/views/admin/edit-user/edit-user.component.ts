import {UserService} from '../../../core/services/api/user.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from 'src/app/core/models/user.model';
import {AddressService} from "../../../core/services/api/address.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  editUserForm!: FormGroup;
  errorMessage: string = '';
  userId!: string;
  user: User[] = [];
  providers: any[] = [];
  districts: any[] = [];
  wards: any[] = [];
  constructor(private userService: UserService, private fb: FormBuilder,
              private router: ActivatedRoute, private addressService: AddressService) {
    this.editUserForm = this.fb.group({
      fullname: [, [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^\\d{10,11}$')]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$')]],
      province: [''],
      district: [''],
      ward: [''],
    })
  }

  ngOnInit(): void {
    this.userId = this.router.snapshot.paramMap.get('id') || '';
    this.userService.getUserById(this.userId).subscribe({
      next: (responst) => {
        this.user = responst.data ?? [];
      },
      error: (e: any) => {
        this.errorMessage = e.error.message;
      }
    })
    this.addressService.getAllProviders().subscribe({
      next: (response) => {
        this.providers = response.data ?? [];
      },
      error: (error: any) => {
        this.errorMessage = error.error.message;
      }
    })
  }

  selectedProvince() {
    const provinceCode = this.editUserForm.get('province')?.value;
    console.log(provinceCode)
    if (provinceCode) {
      this.addressService.getDistrictsByCodeProvince(provinceCode).subscribe({
        next: (response) => {
          this.districts = response.data ?? [];
        },
        error: (error: any) => {
          this.errorMessage = error.error.message;
        }
      });
    }
  }
  selectedDistrict(){
    const districtCode = this.editUserForm.get('district')?.value;
    console.log(districtCode)
    if (districtCode) {
      this.addressService.getWardByCodeDistrict(districtCode).subscribe({
        next: (response) => {
          this.wards = response.data ?? [];
        },
        error: (error: any) => {
          this.errorMessage = error.error.message;
        }
      });
    }
  }
  getError(controlName: string): string {
    const control = this.editUserForm.get(controlName);
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

  }

  protected readonly Event = Event;
}
