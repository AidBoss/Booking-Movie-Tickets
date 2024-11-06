// src/app/auth/auth.component.ts
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isSignUp?: boolean;
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.isSignUp = data['isSignUp'];
    });
    this.route.url.pipe(
      switchMap(() => this.route.firstChild?.data ?? [])
    ).subscribe(data => {
      this.isSignUp = data['isSignUp'];
    });
  }

  toggleForm() {
    this.isSignUp = !this.isSignUp;
    const url = this.isSignUp ? '/register' : '/login';
    this.router.navigate([url]);
  }
}
