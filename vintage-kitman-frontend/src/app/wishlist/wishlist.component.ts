import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order/order.service';
import { kitVM } from '../models/categories/kit-vm';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  kitArray: kitVM[] = [];
  constructor(private ordersService: OrderService) {}
  ngOnInit(): void {
    this.ordersService.getWishlist().subscribe({
      next: (response) => {
        this.kitArray = response as kitVM[];
        console.log(response);
      },
      complete: () => {},
      error: (err) => {
        console.log(err);
      },
    });
  }


}
