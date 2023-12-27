import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterVM } from 'src/app/models/authentication/register-vm';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  displayError:boolean = false
  ifIsLoading:boolean = false
  registerForm!:FormGroup
  registerModel:RegisterVM =
  {
    name: '',
    surname: '',
    email: '',
    password: '',
  }
  errorMessage: string='Password and Confirm Password must be same'
  
  constructor(private fb:FormBuilder, private authService:AuthService, private router: Router, private location:Location) {}

  ngOnInit(): void {
      this.registerForm = this.fb.group({
        name: ['',Validators.required],
        surname: ['',Validators.required],
        email: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*]).{8,}$')]],
        confirmPassword: ['', Validators.required]
      })
  }

  onSignUp()
  {
    this.ifIsLoading = true
    this.registerModel.name = this.registerForm.value.name
    this.registerModel.surname= this.registerForm.value.surname
    this.registerModel.email = this.registerForm.value.email
    this.registerModel.password = this.registerForm.value.password

    debugger
    if(this.registerForm.value.password == this.registerForm.value.confirmPassword)
    {
      if(this.registerForm.valid)
      {
        this.authService.customerRegister(this.registerModel)
        .subscribe({
          next:(response:any)=>
          {
              console.log(response)
              this.ifIsLoading = true
              localStorage.setItem('token', response.token)
          }
          ,complete:()=>{
              this.location.back()   
              this.ifIsLoading = false  
            },
            error:(err:any)=>{
              this.ifIsLoading = false
            }

        })
      }
    }
    else
    {
      this.ifIsLoading = false
      this.displayError = false
    }


  }
}
