import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordVM } from 'src/app/models/authentication/reset-password-vm';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetForm!: FormGroup;
  formSubmitted : boolean = false 
  resetPasswordModel :ResetPasswordVM={ id: '', token: '', password: '', confirmPassword: '' }

  constructor(private route: ActivatedRoute, private formBuilder : FormBuilder, private authService: AuthService, private router : Router) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.queryParams['userId'];
    const token = this.route.snapshot.queryParams['token'];
  
    console.log('userId:', userId);
    console.log('token:', token);

    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(7), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*]).{8,}$')]],
      confirmPassword: ['', Validators.required]
    });  }


  onSubmit(){
    const userId = this.route.snapshot.queryParams['userId'];
    const token = this.route.snapshot.queryParams['token'];
    const password = this.resetForm.value.password;
    const confirmPassword  = this.resetForm.value.confirmPassword;

    this.resetPasswordModel.id = userId;
    this.resetPasswordModel.token = token;
    this.resetPasswordModel.password = password;
    this.resetPasswordModel.confirmPassword = confirmPassword;
    this.formSubmitted =true
    if(this.resetForm.valid){
      this.authService.resetPassword(this.resetPasswordModel).subscribe({
        next : (reponse) =>{
          console.log(reponse)
        }, complete: () => {
          this.router.navigate(['login'])
          this.route.snapshot.queryParams['userId'] =""
          this.route.snapshot.queryParams['token'] = ""
        }
      })    
    }

  }

}
