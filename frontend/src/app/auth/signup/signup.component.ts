import { Component,OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  signupForm!:FormGroup;
  message: string='';
  status!: boolean;
  constructor(private router:Router, 
    private dialog: MatDialog,private formBuilder: FormBuilder, private authService:AuthService){}

  ngOnInit(): void {
    this.setupForm();
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  signup():void{
    if(this.signupForm.valid){
      const username = this.signupForm.get('username')?.value;
      const password = this.signupForm.get('password')?.value;
      const confirmPassword = this.signupForm.get('confirmPassword')?.value;
      const email = this.signupForm.get('email')?.value;
      const phone = this.signupForm.get('phone')?.value;
      this.authService.signup(username,password,email,phone).subscribe(
        (response: any) => {
          this.message = response.message;
          this.status = true;
          this.router.navigate(['login']);
        },
        (error: any) => {
          this.message = error.error.message;
          this.status = false;
        }
      )
    }
    else{
      this.message = 'Pleas fill the form to continue';
      this.status = false;
    }
  }

  private setupForm(): void {
    this.signupForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')]],
      confirmPassword: [null, [Validators.required]],
      email: [null, [Validators.required,Validators.email]],
      phone: [null, [Validators.required,Validators.pattern('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')]],
    });
    this.signupForm.addValidators(
      this.matchValidator(this.signupForm.get('password'), this.signupForm.get('confirmPassword'))
    ); 
  }

  private  matchValidator( control: AbstractControl|null, controlTwo: AbstractControl|null): ValidatorFn {
    return () => {
      if (control?.value !== controlTwo?.value)
        return { match_error: 'Value does not match' };
      return null;
    };
  }
}
