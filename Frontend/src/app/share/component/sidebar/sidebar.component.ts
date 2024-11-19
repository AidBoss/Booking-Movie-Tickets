import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/api/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private authService: AuthService, private router: Router) { }
  toggleNavbar() {
    const nav = document.getElementById('nav-bar');
    const body = document.getElementById('admin-container');
    if (nav && body) {
      nav.classList.toggle('show');
      body.classList.toggle('body-pd');
    }
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
