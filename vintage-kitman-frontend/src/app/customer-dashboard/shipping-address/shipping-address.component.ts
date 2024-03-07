import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { Address } from 'src/app/models/authentication/address-vm';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { filter, pairwise } from 'rxjs';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.scss']
})
export class ShippingAddressComponent implements OnInit{

  addressForm!: FormGroup;
  ifIsLoading: boolean = false;
  formSubmitted: boolean = false;
  addressDetails: Address={name: '', addressName1: '', addressName2: '', province: '', zipCode: 0, buildingName: '', unitNumber: '', isMain: false, user: null,addressId: 0}
  provinces = [
    { name: 'Eastern Cape' },
    { name: 'Free State' },
    { name: 'Gauteng' },
    { name: 'KwaZulu-Natal' },
    { name: 'Limpopo' },
    { name: 'Mpumalanga' },
    { name: 'North West' },
    { name: 'Northern Cape' },
    { name: 'Western Cape' }
  ];
  addressArray: Address[]=[]
  showAddForm:boolean = false
  previousUrl: string = '';
  currentUrl: string = '';

  constructor(private fb:FormBuilder, private authService:AuthService, private location:Location, private snackar: MatSnackBar, private router:Router) {
;
   }
  ngOnInit(): void {
    this.addressForm = this.fb.group({
      name: ['', Validators.required],
      addressName1: ['', Validators.required],
      addressName2: ['', Validators.required],
      province: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      buildingName: [''],
      unitNumber: ['']
    });

    this.getAddresses()

    //get router events
    this.router.events
    .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
    .subscribe((events: RoutesRecognized[]) => {
      this.currentUrl = events[0].urlAfterRedirects;
      this.previousUrl = events[1].urlAfterRedirects;   
      console.log(this.previousUrl)                                                                                                             
    });                           

  }

  onSubmit(): void {

    this.addressDetails.isMain = false
    this.addressDetails.addressName1 = this.addressForm.value.addressName1
    this.addressDetails.addressName2 = this.addressForm.value.addressName2
    this.addressDetails.buildingName = this.addressForm.value.buildingName
    this.addressDetails.name = this.addressForm.value.name
    this.addressDetails.province = this.addressForm.value.province
    this.addressDetails.unitNumber = this.addressForm.value.unitNumber
    this.addressDetails.zipCode = this.addressForm.value.zipCode

    this.ifIsLoading=true
    this.formSubmitted = true
    if (this.addressForm.valid) {
      console.log(this.addressForm.value);
      this.ifIsLoading = true;
      this.authService.addAddress(this.addressDetails).subscribe({
        next: (res: any) => {
          this.ifIsLoading = false;

        },
        complete:()=>{
          this.ifIsLoading = false;
          this.location.back();
          this.snackar.open('Address added successfully', 'Close', {
            duration: 3000
          });
          this.getAddresses()

          if(this.previousUrl === '/checkout'){
            this.router.navigate(['/checkout'])
          }
        },
        error: (err: any) => {
          this.ifIsLoading = false;

        }
      });
    } else {
      console.log('Form is not valid!');
      this.ifIsLoading = false
    }
  }
  showForm(){
    this.showAddForm = true
  }
  viewAddresses(){
    this.showAddForm = false
  }

  getAddresses(){
    this.authService.getAddresses().subscribe({
      next:(res:any)=>{
        this.addressArray = res as Address[]
        console.log(this.addressArray)
      },
      complete:()=>{
        
      },
      error:(err:any)=>{}
    })
  }

  setMainAddress(newMain: Address){
    this.ifIsLoading = true
    this.authService.setMainAddress(newMain).subscribe({
      next:(res:any)=>{
        console.log(res)
      },
      complete:()=>{
        this.ifIsLoading = false
        this.snackar.open('Main address updated', 'Close', {
          duration: 3000
        });
        this.getAddresses()
      },
      error:(err:any)=>{
        this.ifIsLoading = false
      }
    })

  }

  deleteAddress(address: Address){
    this.ifIsLoading = true
    console.log(address)
    this.authService.deleteAddress(address.addressId!).subscribe({
      next:(res:any)=>{
        console.log(res)
      },
      complete:()=>{
        this.ifIsLoading = false
        this.snackar.open('Address deleted', 'Close', {
          duration: 3000
        });
        this.getAddresses()
      },
      error:(err:any)=>{
        this.ifIsLoading = false
      }
    })
  }

}
