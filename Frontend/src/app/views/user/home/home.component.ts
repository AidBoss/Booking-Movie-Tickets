import { Component } from '@angular/core';
import { AuthService } from "../../../core/services/api/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  mess: string = ""

  constructor(private authService: AuthService) {
  }

  getAccessToken = () => {
    // return this.authService.refreshToken().subscribe({
    //   next: (token) => {
    //     console.log('New access token: ', token.accessToken)
    //   },
    //   error: (error) => {
    //     this.mess = error.error.message || 'Error getting new access token';
    //     console.error('Error getting new access token: ', error)
    //   }
    // })
  }
}
