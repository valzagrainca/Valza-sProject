import { Component,EventEmitter,OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginResponseModel } from '../models/login-response.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  message: string='';
  status!: boolean;

  constructor(private formBuilder: FormBuilder, private authService:AuthService, private router:Router) {}

  ngOnInit() {
    this.setupForm();
  }

  logIn(): void {
    if (this.loginForm.valid) { 
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      this.authService.logIn(email, password).subscribe(
        (response: LoginResponseModel) => {
          if (response && response.token) {
            this.authService.setSession(response.token);
            this.router.navigate(['chat/userchats']);
          }
        },
        error => {
          this.message = error.error.message;
          this.status = false;
        }
      );
    }
  }
  
  navigateToSignup(): void {
    this.router.navigate(['/signup']);
  }
  private setupForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }
}
