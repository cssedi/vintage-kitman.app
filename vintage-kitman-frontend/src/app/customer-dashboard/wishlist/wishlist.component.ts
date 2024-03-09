import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order/order.service';
import { kitVM } from '../../models/categories/kit-vm';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  kitArray: kitVM[] = [];
  loading:boolean = true
  constructor(private ordersService: OrderService) {}
  ngOnInit(): void {
    this.getWishlist();
  }
  getWishlist() {
    this.ordersService.getWishlist().subscribe({
      next: (response) => {
        this.kitArray = response as kitVM[];
        this.loading = false
      },
      complete: () => {
        this.loading = false
      },
      error: (err) => {
        this.loading = false
      },
    });
  }

  removeFromWishlist(kit: kitVM) {

    this.ordersService.removeFromWishlist(kit).subscribe({
      next: (response) => {
        console.log(response);
        this.kitArray.splice(this.kitArray.indexOf(kit), 1);
      },
      complete: () => {
        this.getWishlist();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


}
