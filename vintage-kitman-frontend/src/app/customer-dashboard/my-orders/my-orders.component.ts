import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { KitOrderVM } from 'src/app/models/orders/KitOrderVM';
import { CustomOrderVM } from 'src/app/models/orders/custom-order-vm';
import { OrderVM } from 'src/app/models/orders/order-vm';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MyOrdersComponent implements OnInit{
  customerOrders: CustomOrderVM[] = [];
  userOrders:KitOrderVM[] = []
  messageModal:boolean = false;
  customOrderObj: CustomOrderVM={customOrderId: 0, size: '', name: '', quantity: 0, image: '', isSourcable: null, customName: null, customNumber: null, message: null, user: null, isViewed: null,customOrderStatus: null}
  isError:boolean = false

  constructor(private orderService:OrderService) { }
  ngOnInit(): void {
    this.orderService.getUserCustomOrders().subscribe(
      {  
        next: (res:any)=>{
          this.customerOrders = res as CustomOrderVM[]
          console.log(res)
        },
        error: (err:any)=>{
          console.log(err)
        }
      }
      )

      //get user orders
      this.orderService.getUserOrders().subscribe(
        {  
          next: (res:any)=>{
            this.userOrders = res as KitOrderVM[]
            console.log(res)
          },
          error: (err:any)=>{
            console.log(err)
          }
        }
        )


  }

  viewMessage(order:CustomOrderVM){

    this.customOrderObj = order
    this.messageModal = true
  }
    closeModal(){
      this.messageModal = false
    }
}
