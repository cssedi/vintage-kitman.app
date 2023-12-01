import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginVM } from 'src/app/models/authentication/login-vm';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService, private fb:FormBuilder, private router: Router) {  }

  //variables
  LoginForm!: FormGroup;
  ifIsLoading: boolean = false;
  model:LoginVM=
  {
    email: '',
    password: ''
  }


  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  SignIn(){
    this.model.email = this.LoginForm.value.email;
    this.model.password = this.LoginForm.value.password;
    //form validation
    if(this.LoginForm.valid)
    {
      this.authService.CustomerLogin(this.model).subscribe(
      {
        next: (res)=>{
          console.log(res)
          localStorage.setItem("user", JSON.stringify(res))
          this.ifIsLoading = true
        },
        complete: ()=>{
          console.log("complete")
          this.ifIsLoading = false
          this.router.navigate(['products'])

        },
        error: (err:any)=>{
          console.log(err)
          this.ifIsLoading = false
        }
     })
    }

  }

}
