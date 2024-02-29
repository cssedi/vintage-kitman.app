import { Component, OnInit } from '@angular/core';
import { ApplicationUser } from 'src/app/models/authentication/appuser';
import { KitOrderVM } from 'src/app/models/orders/KitOrderVM';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-placed-orders',
  templateUrl: './placed-orders.component.html',
  styleUrls: ['./placed-orders.component.scss']
})
export class PlacedOrdersComponent implements OnInit {
  month:Date = new Date();
  Audits:any[] = []
  orders:KitOrderVM [] = []
  userObj: ApplicationUser= {id: '', userName: '', email: '', phoneNumber: '', name: '', surname: '', address: '', addresses: [], customOrders: [], wishlist:null};
  kitOrder: KitOrderVM = { kitId: 0, orderId: 0, uniqueOrdenum: '', orderStatusId: 0, id: '', name: '', frontImage: '', uniqueOrderNum: '', address: '', price: 0, size: '', quantity: 0, customName: '', customNumber: 0, user: null, orderStatus: null, kit: null };
  //modals
  fullScreenImageModal:boolean = false;
  userModal:boolean = false;

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


  //modal
  closeModal(){
    this.userModal = false
    // this.confirmModal = false
    // this.rejectModal = false
    this.fullScreenImageModal = false
  }

}
