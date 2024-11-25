import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../core/services/api/user.service";
import Swal from 'sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from 'src/app/core/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  errorMessage: string = '';
  checked: boolean = false;
  users: User[] = [];
  txt: string = "";
  NewArrUser: User[] = []

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response.data ?? [];
        this.NewArrUser = [...this.users];
      },
      error: (error: any) => {
        this.errorMessage = error
        this.errorMessage = error.error.message;
      }
    });
  }


  editUser = (id: string) => {
    this.router.navigate(['/edit-user', id]);
  }

  LockUser = (id: string, status: boolean) => {
    if (status) {
      this.txt = "khóa"
    } else {
      this.txt = "mở"
    }
    const data = {
      status: status,
      _id: id,
    };
    Swal.fire({
      title: `Bạn có chắc chắn ${this.txt} không?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `${this.txt}`
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.lockUser(data).subscribe({
          next: () => {
            const user = this.NewArrUser.findIndex(user => user._id === id);
            if (user !== -1) {
              this.NewArrUser[user].status = !this.NewArrUser[user].status;
              this.users = [...this.NewArrUser]
            }
            Swal.fire({
              title: `Đã ${this.txt}!`,
              text: `Bạn đã ${this.txt} thành công.`,
              icon: "success",
            });
          },
          error: (error: any) => {
            this.errorMessage = error.error.message;
          }
        });
      }
    });
  }

  deleteUserById = (id: string) => {
    Swal.fire({
      title: "Bạn có chắc chắn không ?",
      text: "Bạn không thể sửa đổi lại!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: " Xóa !"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUserById(id).subscribe({
          next: () => {
            const user = this.NewArrUser.filter(user => user._id !== id);
            this.users = [...user];
            Swal.fire({
              title: "Đã xóa!",
              text: "Bạn đã xóa thành công.",
              icon: "success"
            });
          },
          error: (error: any) => {
            this.errorMessage = error.error.message;
          }
        });
      }
    });
  }

  selectAll(event: Event) {

  }
}
