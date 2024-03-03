import { Component, OnInit } from '@angular/core';
import { ApplicationUser } from 'src/app/models/authentication/appuser';
import { KitOrderVM } from 'src/app/models/orders/KitOrderVM';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-view-all-orders',
  templateUrl: './view-all-orders.component.html',
  styleUrls: ['./view-all-orders.component.scss']
})
export class ViewAllOrdersComponent implements OnInit {
  orders:KitOrderVM [] = []
  userObj: ApplicationUser= {id: '', userName: '', email: '', phoneNumber: '', name: '', surname: '', address: '', addresses: [], customOrders: [], wishlist:null};
  kitOrder: KitOrderVM = { kitId: 0, orderId: 0, uniqueOrdenum: '', orderStatusId: 0, id: '', name: '', frontImage: '', uniqueOrderNum: '', address: '', price: 0, size: '', quantity: 0, customName: '', customNumber: 0, user: null, orderStatus: null, kit: null };
  fullScreenImageModal:boolean = false;
  userModal:boolean = false;
  //array of months objects
  months: { name: string, value: number }[] = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 }
  ];

  month: number=0





  constructor(private orderService: OrderService, private authService:AuthService) { }
  ngOnInit(): void {
    //getmonthly orders
    this.orderService.getMonthlyOrders()
    .subscribe
    ({
      next:(response)=>
      {
        this.orders = response as KitOrderVM[]
        console.log(response)
      },
      error:(error)=>
      {
      }
    }) 
    this.filterOrdersByMonth()

  }

  getUserDetails(order:KitOrderVM){
    this.authService.GetOrderCustomerDetails(order.user!.id).subscribe({
      next: (res:any)=>{
        this.userObj = res as ApplicationUser
        this.userModal = true
        this.kitOrder.address = order.address
      },
      error: (err:any)=>{
        console.log(err)
      }
    })
  }

  viewImage(order:KitOrderVM){
    this.kitOrder = order
    this.fullScreenImageModal = true
  }
  //function to filter orders based on month, use filter method do not use the orderservice request
  filterOrdersByMonth(){
    this.orderService.getOrders()
    .subscribe({
      next:(response) => {
        this.orders = response as KitOrderVM[]
        this.orders = this.orders.filter(x => x.orderDate && new Date(x.orderDate).getMonth() + 1 == this.month)
        console.log(response)
      },
      error:(error) => {
        // handle error
      }
    }) 
  }
  
  getOrdersByMonth($event: any){
    this.month = $event.target.value
    this.filterOrdersByMonth()
  }





  closeModal(){
    this.userModal = false
    // this.confirmModal = false
    // this.rejectModal = false
    this.fullScreenImageModal = false
  }

}
