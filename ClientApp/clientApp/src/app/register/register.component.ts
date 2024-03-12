import { UserService } from './../services/user.service';
import { RegisterUser, LoginUser, UserDetails } from './../Models/user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { config } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loginForm!: FormGroup;
  isLogin: boolean = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  registerData: RegisterUser = {
    name: '',
    email: '',
    contactNo: '',
    password: '',
  };

  loginData: LoginUser = {
    email: '',
    password: '',
  };

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar) { }
  ngOnInit(): void {
    console.log('register component')
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactno: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/), Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/), Validators.minLength(8)]],

    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/), Validators.minLength(8)]],
    });
  }

  register() {
    this.registerData = this.registerForm.value;
    this.userService.register(this.registerData).subscribe((userDetails: UserDetails) => {
      if (userDetails.userType.toLocaleLowerCase() == 'staff') {
        this.router.navigate(['/staff', userDetails.email]);
      } else {
        this.router.navigate(['/user', userDetails.email]);
      }
    },
      error => {
        this.snackBar.open("failed to login", 'close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
  }

  login() {
    this.loginData = this.loginForm.value;  

    this.userService.login(this.loginData).subscribe((userDetails: UserDetails) => {
      if (userDetails.userType.toLocaleLowerCase() == 'staff') {
        this.router.navigate(['/staff', userDetails.email]);
      } else {
        this.router.navigate(['/user', userDetails.email]);
      }
    },
      error => {
        this.snackBar.open("Failed To Login", 'close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      });
  }

  toggleRegister() {
    this.isLogin = !(this.isLogin)
  }
}
