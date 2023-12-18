import { Location } from '@angular/common';
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

  constructor(private authService:AuthService, private fb:FormBuilder, private router: Router, private location:Location) {  }

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
    this.ifIsLoading = true
    this.model.email = this.LoginForm.value.email;
    this.model.password = this.LoginForm.value.password;
    //form validation
    if(this.LoginForm.valid)
    {
      this.authService.CustomerLogin(this.model).subscribe(
      {
        next: (res:any)=>{
          let user ={name:res.name, surname:res.surname, email:res.email}

          localStorage.setItem('token', res.token)
          localStorage.setItem('user', JSON.stringify(user))        },
        complete: ()=>{
          console.log("complete")
          this.ifIsLoading = false
          this.location.back()
        },
        error: (err:any)=>{
          console.log(err)
          this.ifIsLoading = false
        }
     })
    }

  }

}
