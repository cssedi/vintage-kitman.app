import { Component } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { OrderService } from '../services/order/order.service';
import { CartItem } from '../models/orders/CartItem-vm';
import { PaystackOptions } from 'angular4-paystack';
import { AuthService } from '../services/authentication/auth.service';
import { Address } from '../models/authentication/address-vm';
import { KitOrderVM } from '../models/orders/KitOrderVM';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
  addressString = ''
  kitOrderArray: KitOrderVM[] = []
  public showEmbed = false;

  public results = {
    name: ''
  };
  tRef = '';
  result = '';
  constructor(private cartService:CartService, private orderService:OrderService, private authService: AuthService, 
              private snackBar: MatSnackBar,private router: Router) {}
  ngOnInit(): void 
  {
    const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.cartArray = cart;
    this.ifIsLoading = true
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
        this.addressString = this.address.addressName1 + ' ' + this.address.addressName2 + ' ' + this.address.buildingName + ' ' + this.address.unitNumber + ' ' + this.address.province + ' ' + this.address.zipCode
        console.log(this.addressString)
      },
      complete: () => {

      },
      error: (err) => {

      }
    })

  }


  toggleEmbed() {
    this.showEmbed = !this.showEmbed;
  }

  paymentInit() {
    console.log('Payment initialized');
  }

  paymentDone(ref: any) {
    this.title = 'Payment successful';
    this.placeOrder()
    console.log(this.title, ref);
  }

  paymentCancel() {
    this.title = 'Payment failed';
    this.router.navigate(['/payment-failed'])


    console.log(this.title);
  }

  
  placeOrder(){
    if(this.address){
      this.cartArray.forEach(element => {
        let kitOrder: KitOrderVM = {
          kitId: 0, quantity: element.Quantity,
          orderId: 0, uniqueOrdenum: '', orderStatusId: 0, id: '',
          name: element.KitName,
          frontImage: element.KitImage,
          price: element.KitPrice,
          size: element.SizeId,
          user: null, orderStatus: null, kit: null,
          uniqueOrderNum: '',address: this.addressString
        }
        this.kitOrderArray.push(kitOrder)
      });
    }
    this.orderService.createOrder(this.kitOrderArray)
    .subscribe({
      next: (response:any) => {
        console.log('Next block executed with response:', response);
      },
      complete: () => {
        console.log('complete block executed');

        localStorage.removeItem('cart')
        this.snackBar.open('Order Placed Successfully', 'Close', {
          duration: 15000
        })

        
        this.router.navigate(['/approved-payment'])
        .then(() => {
          this.cartService.updateCartItemsCount(0);         
        })
        


        
      },
      error: (err:any) => {
        console.log('error block executed with error:', err);

      }
    })
  }


}
