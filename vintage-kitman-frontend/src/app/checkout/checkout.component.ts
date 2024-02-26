import { Component } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { OrderService } from '../services/order/order.service';
import { CartItem } from '../models/orders/CartItem-vm';
import { PaystackOptions } from 'angular4-paystack';
import { AuthService } from '../services/authentication/auth.service';
import { Address } from '../models/authentication/address-vm';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  cartArray: CartItem[] = [];
  totalCost: number = 0;
  ifIsLoading:boolean = false
  title = 'angular-paystack';
  options: any={}
  shipping = 130
  subTotal = 0
  deliveryAddress = ''
  address: Address = {name: '', addressName1: '', addressName2: '', province: '', zipCode: 0, buildingName: '', unitNumber: '', isMain: false, user: null,addressId: 0}

  constructor(private cartService:CartService, private orderService:OrderService, private authService: AuthService) {}
  ngOnInit(): void 
  {
    const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.deliveryAddress= user.deliveryAddress!
    this.cartArray = cart;
    this.ifIsLoading = true
    this.setRandomPaymentRef();
    //get cart total
    this.orderService.getCartTotal(this.cartArray)
    .subscribe
    ({
      next:(response)=>
      { 
        this.subTotal = response.total
        this.totalCost =this.subTotal+ this.shipping
        
        var cost = this.totalCost *100
        const options: PaystackOptions =
        {
          amount: cost,
          currency: "ZAR",
          email: user.email,
          ref: `${Math.ceil(Math.random() * 10e10)}`
        };  
        this.options = options;
        console.log(this.options)
      },
      complete: ()=>{this.ifIsLoading=false},
      error:(err)=>{this.ifIsLoading = false}
    })

    this.getMainAddress()

  
  }

  getMainAddress(){
    this.authService.getMainAddress().subscribe({
      next: (response) => {
        this.address = response
        console.log(this.address)
      },
      complete: () => {

      },
      error: (err) => {

      }
    })

  }

  public showEmbed = false;

  public results = {
    name: ''
  };
  tRef = '';
  result = '';

  toggleEmbed() {
    this.showEmbed = !this.showEmbed;
  }

  paymentInit() {
    console.log('Payment initialized');
  }

  paymentDone(ref: any) {
    this.title = 'Payment successful';
    console.log(this.title, ref);
  }

  paymentCancel() {
    this.title = 'Payment failed';
    console.log(this.title);
  }

  setRandomPaymentRef() {
    this.tRef = `${Math.random() * 10000000000000}`;
  }


}
