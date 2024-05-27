import { Component, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  isLoginVisible: boolean = true;
  errorMessage: string = ""
  loginMessage: string = ""

  @ViewChild('loginEmailInput') loginEmailInput!: ElementRef;
  @ViewChild('loginPasswordInput') loginPasswordInput!: ElementRef;

  @ViewChild('registerEmailInput') registerEmailInput!: ElementRef;
  @ViewChild('registerPasswordInput') registerPasswordInput!: ElementRef;

  constructor(private auth: AuthService, private router: Router) {
    
    if (auth.getSession()) {
      this.router.navigate(['/tasks'])
    }
   }

  validatePassword(password: string): boolean {

    if (password.length < 8) {
      this.errorMessage = "Password must be 8 characters.";
      return false;
    }
    else if (! password.match("/[A-Z]/") || ! password.match("/[a-z]/")) {
      this.errorMessage = "Password must have atleast 1 character";
      return false;
    }
    else if (password.match("/[1-9]/")) {
      this.errorMessage = "Password must have atleast 1 numeric";
      return false;
    }
    else {
      return true;
    }
  }

  public register() {

    var registerEmail = this.registerEmailInput.nativeElement.value;
    var registerPassword = this.registerPasswordInput.nativeElement.value;

    if(this.validatePassword(registerPassword)) {
      this.auth.signUp(registerEmail, registerPassword).subscribe({next: (response) => {
        if (response.error) {
          alert("Unable to register user!");
        }
        else {
          alert("Successfully created account, you may now login");
        }
      }, error: (error) => {
        alert("Unable to register user!")
      }});
    }
  }

  public login() {

    var loginEmail = this.loginEmailInput.nativeElement.value;
    var loginPassword = this.loginPasswordInput.nativeElement.value;

    this.auth.signIn(loginEmail, loginPassword).subscribe({next: (response) => {
      if (response.error) throw Error(response.error)
      localStorage.setItem('user_id', response.data.user.id)
    }, error: (error) => {
      this.loginMessage = "Invalid username or password!"
    }, complete: () => {
      this.router.navigate(['/tasks'])
    }});
  }

  toggleForm(formType: string): void {

    this.isLoginVisible = formType === 'login';
  }
}