import { Component, OnInit } from '@angular/core';
import { CartItem } from '../models/orders/CartItem-vm';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartArray: CartItem[] = [];
  totalCost: number = 0;

  constructor(private cartService:CartService) {

    
  }
  ngOnInit(): void 
  {
    const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartArray = cart;
    console.log(this.cartArray)
    this.cartArray.forEach(item => {
      this.totalCost =+ this.totalCost + (item.Quantity * item.KitPrice);
    });
  }

  decreaseQuantity(cartItem: CartItem) 
  {
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
    this.totalCost = 0;
    this.cartArray.forEach(item => {
      this.totalCost = this.totalCost + (item.Quantity * item.KitPrice);
    });
    
    
    console.log(this.totalCost);
  }

  increaseQuantity(cartItem: CartItem) {
    //increase quantity
    cartItem.Quantity++;
    //update cart
    localStorage.setItem('cart', JSON.stringify(this.cartArray));
    this.cartService.updateCartItemsCount(this.cartArray.length);
    //calculate total cost
    this.totalCost = 0;
    this.cartArray.forEach(item => {
      this.totalCost = this.totalCost + (item.Quantity * item.KitPrice);
    });

    console.log(this.totalCost);

  }

  deleteItem(cartItem: CartItem) {
    //remove cart item
    this.cartArray.splice(this.cartArray.indexOf(cartItem),1)
    //update cart
    localStorage.setItem('cart', JSON.stringify(this.cartArray));
    this.cartService.updateCartItemsCount(this.cartArray.length);
    //calculate total cost
    this.totalCost = 0;
    this.cartArray.forEach(item => {
      this.totalCost = this.totalCost + (item.Quantity * item.KitPrice);
    });
    console.log(this.totalCost);
  }



}
