import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterVM } from 'src/app/models/authentication/register-vm';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  registerForm!:FormGroup
  registerModel:RegisterVM =
  {
    name: '',
    surname: '',
    email: '',
    password: '',
  }
  errorMessage: string=''
  
  constructor(private fb:FormBuilder, private authService:AuthService) {}

  ngOnInit(): void {
      this.registerForm = this.fb.group({
        name: ['',Validators.required],
        surname: ['',Validators],
        email: ['', Validators.required],
        password: ['', Validators.required, Validators.pattern('')],
        confirmPassword: ['', Validators]
      })
  }

  onSignUp()
  {
    this.registerModel.name = this.registerForm.value.name
    this.registerModel.surname= this.registerForm.value.surname
    this.registerModel.email = this.registerForm.value.email
    this.registerModel.password = this.registerForm.value.password

    if(this.registerForm.value.password == this.registerForm.value.confirmPassword)
    {
      if(this.registerForm.valid)
      {
        this.authService.customerRegister(this.registerModel)
        .subscribe({
          next:(response)=>
          {
              console.log(response)
          }
        })
      }
    }
    else
    {
     this.errorMessage = 'Password do not match ' 
    }

  }
}
