import { Component, OnInit } from '@angular/core';
import { CartItem } from '../models/orders/CartItem-vm';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartArray: CartItem[] = [];
  ngOnInit(): void 
  {
    const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartArray = cart;
    console.log(this.cartArray)
  }

  decreaseQuantity(cartItem: CartItem) {
    if (cartItem.Quantity > 1) {
      var someItem = this.cartArray.filter(item => item.KitName === cartItem.KitName)
      this.cartArray.splice(this.cartArray.indexOf(someItem[0]), 1);
      localStorage.setItem('cart', JSON.stringify(this.cartArray));
      window.location.reload();
    }
    this.cartArray.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(this.cartArray));
  }

  increaseQuantity(cartItem: CartItem) {
    cartItem.Quantity++;
    this.cartArray.pop();
    this.cartArray.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(this.cartArray));

  }

}
