import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-on-stock-kits',
  templateUrl: './on-stock-kits.component.html',
  styleUrls: ['./on-stock-kits.component.scss']
})
export class OnStockKitsComponent implements OnInit {

  kitArray:any;

  constructor(private orderService: OrderService) {}
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }




}
