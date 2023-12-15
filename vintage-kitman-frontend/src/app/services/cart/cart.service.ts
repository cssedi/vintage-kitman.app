import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItemsCountSubject = new BehaviorSubject<number>(0);
  cartItemsCount$ = this.cartItemsCountSubject.asObservable();

  constructor() {
    // Load cart items from local storage during service initialization
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.updateCartItemsCount(cart.length);
  }

  updateCartItemsCount(count: number): void {
    this.cartItemsCountSubject.next(count);
  }
}
