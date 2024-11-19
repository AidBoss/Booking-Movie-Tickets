import { UserService } from '../../../core/services/api/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  errorMessage: string = '';
  userId!: string;
  user: User[] = [];
  constructor(private userService: UserService, private router: ActivatedRoute) {
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
  }
}
