import { UserService } from './../services/user.service';
import { RegisterUser, LoginUser, UserDetails } from './../Models/user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loginForm!: FormGroup;
  isLogin: boolean = true;

  registerData: RegisterUser = {
    fullName: '',
    email: '',
    contactNo: '',
    password: '',
  };

  loginData: LoginUser = {
    email: '',
    password: '',
  };

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
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

    this.userService.register(this.registerData).subscribe((next: UserDetails) => {
    },
      (error: any) => {

      });
  }

  login() {
    this.loginData = this.loginForm.value;

    this.userService.login(this.loginData).subscribe((UserDetails: UserDetails) => {

    },
      (error: any) => {

      })
  }

  toggleRegister() {
    this.isLogin = !(this.isLogin)
  }
}
