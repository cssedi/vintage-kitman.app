import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordVM } from 'src/app/models/authentication/forgotpassword-vm';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  ifIsLoading:boolean = false;
  resetPasswordForm!: FormGroup;
  forgotPasswordDetails:ForgotPasswordVM ={email: '',message: null}

  constructor(private authService:AuthService,private fb:FormBuilder) { }
  ngOnInit(): void 
  {
    this.resetPasswordForm = this.fb.group(
      {
        email: ['', Validators.required]
      })  
  }

  onSubmit(){
    
    this.ifIsLoading = true;
    this.forgotPasswordDetails.email = this.resetPasswordForm.value.email;
    this.authService.forgotPassword(this.forgotPasswordDetails).subscribe(
      {
        next: (res:any)=>
        {
          console.log(res)
        },
        complete: ()=>
        {
          this.ifIsLoading = false
        },
        error: (err:any)=>
        {
          console.log(err)
          this.ifIsLoading = false
        }
      })

  }
}
