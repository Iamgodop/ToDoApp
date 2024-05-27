import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css'
})
export class AppHeaderComponent {
  
  isUserLoggedIn = false

  constructor(private authService: AuthService, private router: Router) {
    if (localStorage.getItem('user_id')) {
      this.isUserLoggedIn = true;
    }
  }

  signOut() {
    this.authService.signOut().subscribe({next: (response) => {
      if (localStorage.getItem('user_id')) {
        this.isUserLoggedIn = false;
        localStorage.removeItem('user_id');
        alert('Successfully signed out!');
        this.router.navigate(['/auth'])
      }
    }})
  }
}
