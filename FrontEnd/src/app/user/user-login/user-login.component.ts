import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForLogin } from 'src/app/model/user';
import { AlertyfyService } from 'src/app/services/alertyfy.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private alertyfy: AlertyfyService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onLogin(loginForm: NgForm) {
    this.authService.authUser(loginForm.value).subscribe(
      (response: any) => {
        console.log(response);
        const user = response;
        localStorage.setItem('token', user.token);
        localStorage.setItem('userName', user.userName);
        this.alertyfy.success('Login Successful');
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
        this.alertyfy.error(error.error);
      }
    );

    // if (token) {
    //   localStorage.setItem('token', token.userName);
    //   this.alertyfy.success('Login Successful');
    //   this.router.navigate(['/']);
    // } else {
    //   this.alertyfy.error('User id or password is wrong');
    // }
  }
}
