import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../core/services/api/user.service";
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  errorMessage: string = '';
  dis: boolean = false;
  users: User[] = [];

  NewArrUser: User[] = []
  constructor(private userService: UserService, private router: Router) {
  }
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        // Nếu response.data là undefined hoặc null, gán mảng rỗng
        this.users = response.data ?? [];
        this.NewArrUser = [...this.users];
      },
      error: (error: any) => {
        this.errorMessage = error.error.message;
      }
    });
  }



  editUser = (id: string) => {
    this.router.navigate(['/edit-user', id]);
  }
  LockUser = (id: string, status: boolean) => {
    const data = {
      status: status,
      _id: id,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Lock it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.lockUser(data).subscribe({
          next: () => {
            const user = this.NewArrUser.findIndex(user => user._id === id);
            if (user !== -1) {
              this.NewArrUser[user].status = !this.NewArrUser[user].status;
              this.users = [...this.NewArrUser]
              this.dis = true;
            }
            Swal.fire({
              title: "Locked!",
              text: "User has been marked as Locked.",
              icon: "success",
            });
            setTimeout(() => {
              this.dis = false;
            }, 2500);
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
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUserById(id).subscribe({
          next: () => {
            const user = this.NewArrUser.filter(user => user._id !== id);
            this.users = [...user];
            Swal.fire({
              title: "Deleted!",
              text: "User has been marked as deleted.",
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

}
