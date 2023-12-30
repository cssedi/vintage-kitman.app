import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { LoginVM } from 'src/app/models/authentication/login-vm';
import { TokenData } from 'src/app/models/authentication/tokendata';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService, private fb:FormBuilder, private router: Router,
              private cdr:ChangeDetectorRef, private zone:NgZone) {  }

  //variables
  LoginForm!: FormGroup;
  ifIsLoading: boolean = false;
  model:LoginVM= { email: '',password: '' }
  userDetails = {name:'', surname:'', email:'', role:''}
  // isAdmin:boolean = false

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
      this.authService.UserLogin(this.model).subscribe(
      {
        next: (res:any)=>
        {

          localStorage.setItem('token', res.token)
          if(res.role == "ADMIN")
          {
            localStorage.setItem("6gj6KgI7l0ffhv", "true")
          }
          //set user details
          let decoded:TokenData = jwtDecode(res.token)
          this.userDetails.name = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
          this.userDetails.surname = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname']
          this.userDetails.email = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']
          this.userDetails.role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
          localStorage.setItem("user", JSON.stringify(this.userDetails))
          this.authService.setAuthenticationStatus(true, this.userDetails.role === 'ADMIN');

          this.cdr.detectChanges();
          this.zone.run(() => 
          {
            this.authService.setAuthenticationStatus(true, this.userDetails.role === 'ADMIN');
          });
        
        },
        complete: ()=>
        {
          if(this.userDetails.role == "CUSTOMER")
            this.router.navigate(['/sport-teams/Football']);
          //if admin
          else if(this.userDetails.role == "ADMIN")   
            this.router.navigate(['/placed-orders'])
          //end loading
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
}
