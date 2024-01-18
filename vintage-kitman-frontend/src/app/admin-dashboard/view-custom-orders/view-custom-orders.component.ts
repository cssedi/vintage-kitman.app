import { Component, OnInit } from '@angular/core';
import { CustomOrderVM } from 'src/app/models/orders/custom-order-vm';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-view-custom-orders',
  templateUrl: './view-custom-orders.component.html',
  styleUrls: ['./view-custom-orders.component.scss']
})
export class ViewCustomOrdersComponent implements OnInit {
  month = new Date()
  customOrders: CustomOrderVM[] = []
  promptOpen: boolean = false;

  constructor(private ordersService:OrderService) {  }

  ngOnInit(): void {
    this.ordersService.getAllCustomOrders().subscribe(
      {  
        next: (res:any)=>{
          this.customOrders = res as CustomOrderVM[]
          console.log(res)
        },
        error: (err:any)=>{
          console.log(err)
        }
      }
      )
    }

    confirmOrder(order:CustomOrderVM){
      this.promptOpen = true
      // this.ordersService.confirmCustomOrder(order).subscribe(
      //   {
      //     next: (res:any)=>{
      //       console.log(res)
      //     },
      //     error: (err:any)=>{
      //       console.log(err)
      //     }
      //   }
      // )
    }

}
