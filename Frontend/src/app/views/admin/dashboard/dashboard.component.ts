import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../core/services/admin/manager-user.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  errorMessage: string = '';
  deleted: boolean = false;
  inx: number = 1;

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response.body.data;
        console.log(this.users)
      },
      error: (error: any) => {
        this.errorMessage = error.error.message;
      }
    });
  }

  editUser = (id: string) => {

  }
  deleteUser = (id: string) => {
    this.deleted = true;
    const data = {
      deleted: this.deleted,
      id: id,
    }
    this.userService.deleteUserById(data).subscribe({
      next: (response) => {
        this.deleted = false;
        this.users = this.users.filter(user => user.id !== id);
      },
      error: (error: any) => {
        this.errorMessage = error.error.message;
        this.deleted = false;
      }
    })
  }
}
