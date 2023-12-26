import { Component, OnInit } from '@angular/core';
import { CartItem } from '../models/orders/CartItem-vm';
import { CartService } from '../services/cart/cart.service';
import { OrderService } from '../services/order/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartArray: CartItem[] = [];
  totalCost: number = 0;
  ifIsLoading:boolean = false

  constructor(private cartService:CartService, private orderService:OrderService) {

    
  }
  ngOnInit(): void 
  {
    const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartArray = cart;
    this.ifIsLoading = true

    //get cart total
    this.orderService.getCartTotal(this.cartArray)
    .subscribe
    ({
      next:(response)=>
      { 
        this.totalCost = response.total
      },
      complete: ()=>{this.ifIsLoading=false},
      error:(err)=>{this.ifIsLoading = false}
    })
  }

  decreaseQuantity(cartItem: CartItem) 
  {
    this.ifIsLoading=true
    //decrease quantity
    cartItem.Quantity--;
    //remove cart item if quantity is 0
    if(cartItem.Quantity ==0)
    {
      this.cartArray.splice(this.cartArray.indexOf(cartItem),1)
    }
    //update cart
    localStorage.setItem('cart', JSON.stringify(this.cartArray));
    this.cartService.updateCartItemsCount(this.cartArray.length);

    //calculate total cost
    //get cart total
    this.orderService.getCartTotal(this.cartArray)
    .subscribe
    ({
      next:(response)=>
      {
        console.log(response.total)
        this.totalCost = response.total
      },
      complete: ()=>{this.ifIsLoading=false},
      error:(err)=>{this.ifIsLoading = false}
    })
        
  }

  increaseQuantity(cartItem: CartItem) {
    this.ifIsLoading=true
    //increase quantity
    cartItem.Quantity++;
    //update cart
    localStorage.setItem('cart', JSON.stringify(this.cartArray));
    this.cartService.updateCartItemsCount(this.cartArray.length);
    //update cart total
    this.orderService.getCartTotal(this.cartArray)
    .subscribe
    ({
      next:(response)=>
      {
        this.totalCost = response.total
      },
      complete: ()=>{this.ifIsLoading=false},
      error:(err)=>{this.ifIsLoading = false}
    })


  }

  deleteItem(cartItem: CartItem) {
    this.ifIsLoading = true
    //remove cart item
    this.cartArray.splice(this.cartArray.indexOf(cartItem),1)
    //update cart
    localStorage.setItem('cart', JSON.stringify(this.cartArray));
    this.cartService.updateCartItemsCount(this.cartArray.length);
    //update cart total
    this.orderService.getCartTotal(this.cartArray)
    .subscribe
    ({
      next:(response)=>
      {
        this.totalCost = response.total
      },
      complete: ()=>{this.ifIsLoading=false},
      error:(err)=>{this.ifIsLoading = false}
    })
  }



}
