import {AuthService} from "../../../core/services/api/auth.service";
import {Component, OnInit, inject} from '@angular/core';
import {Router} from "@angular/router"

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  router = inject(Router);

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
