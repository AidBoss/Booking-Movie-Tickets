import {UserService} from '../../../core/services/api/user.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IUser, User} from 'src/app/core/models/user.model';
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
  userId!:string;
  user!: IUser ;
  providers: any[] = [];
  districts: any[] = [];
  wards: any[] = [];

  constructor(private userService: UserService, private fb: FormBuilder,
              private router: ActivatedRoute, private addressService: AddressService) {
    this.editUserForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^\\d{10,11}$')]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$')]],
      province: [''],
      district: [''],
      ward: [''],
    })
  }

  ngOnInit(): void {
    // Lấy userId từ URL
    this.userId = this.router.snapshot.paramMap.get('id') || '';

    // Gọi API lấy thông tin người dùng
    this.userService.getUserById(this.userId).subscribe({
      next: (response) => {
        if (response.data && response.data.length > 0) {
          this.user = response.data[0]; // Lấy người dùng đầu tiên trong mảng
          this.editUserForm.patchValue({
            fullName: this.user.fullName,
            email: this.user.email,
            phone: this.user.phone,
            // province: this.user.province,
            // district: this.user.district,
            // ward: this.user.ward,
          });
        } else {
          this.errorMessage = 'Không tìm thấy thông tin người dùng.';
        }
      },
      error: (e: any) => {
        this.errorMessage = e.error.message;
      }
    });

    this.addressService.getAllProviders().subscribe({
      next: (response) => {
        this.providers = response.data ?? [];
      },
      error: (error: any) => {
        this.errorMessage = error.error.message;
      }
    });
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

  selectedDistrict() {
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
