import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationUser } from 'src/app/models/authentication/appuser';
import { KitOrderVM } from 'src/app/models/orders/KitOrderVM';
import { CustomOrderVM } from 'src/app/models/orders/custom-order-vm';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-view-all-custom-orders',
  templateUrl: './view-all-custom-orders.component.html',
  styleUrls: ['./view-all-custom-orders.component.scss']
})
export class ViewAllCustomOrdersComponent {

  customOrders:CustomOrderVM [] = []
  userObj: ApplicationUser= {id: '', userName: '', email: '', phoneNumber: '', name: '', surname: '', address: '', addresses: [], customOrders: [], wishlist:null};
  customOrderObj: CustomOrderVM = {customOrderId: 0, size: '', name: '', quantity: 0, image: '', isSourcable: null, customName: null, customNumber: null, message: null, user: null, isViewed: null, customOrderStatus: null,orderDate: null};

  fullScreenImageModal:boolean = false;

  customOrderForm!: FormGroup;
  //modals
    userModal:boolean = false;
    confirmModal:boolean = false;
    rejectModal:boolean = false;
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





  constructor(private orderService: OrderService, private authService:AuthService, private fb:FormBuilder) { }
  ngOnInit(): void {
    //getmonthly orders
    this.orderService.getCustomOrders()
    .subscribe
    ({
      next:(response)=>
      {
        this.customOrders = response as CustomOrderVM[]
        console.log(response)
      },
      error:(error)=>
      {
      }
    }) 
    this.filterOrdersByMonth()

    this.customOrderForm = this.fb.group({
      message: ['', Validators.required]
    })

  }
  getUserDetails(order:CustomOrderVM){
    this.authService.AdminGetUserDetails(order.user!.id).subscribe({
      next: (res:any)=>{
        this.userObj = res as ApplicationUser
        this.userModal = true
        console.log(res)
      },
      error: (err:any)=>{
        console.log(err)
      }
    })
  }

  viewImage(order:CustomOrderVM){
    this.customOrderObj = order
    this.fullScreenImageModal = true
  }
  //function to filter orders based on month, use filter method do not use the orderservice request
  filterOrdersByMonth(){
    this.orderService.getAllCustomOrders()
    .subscribe({
      next:(response) => {
        this.customOrders = response as CustomOrderVM[]
        this.customOrders.forEach(element => {
          console.log(element.orderDate?.getMonth())
        });
        this.customOrders = this.customOrders.filter(x => x.orderDate && new Date(x.orderDate).getMonth() + 1 == this.month)
        console.log(this.customOrders)
      },
      error:(error) => {
        // handle error
      }
    }) 
  }
  
  
  getOrdersByMonth($event: any){
    this.month = $event.target.value
    console.log(this.month)
    this.filterOrdersByMonth()
  }

  viewImageFullScreen(order:CustomOrderVM){
    this.fullScreenImageModal =! this.fullScreenImageModal
    this.customOrderObj = order

  }


  confirmOrder(){
    this.customOrderObj.message = this.customOrderForm.value.message
    console.log(this.customOrderObj)
    this.orderService.confirmCustomOrder(this.customOrderObj).subscribe(
      {
        next:(response)=>{
        },
        complete:()=>{
          this.customOrderForm.reset()
          this.confirmModal = false
          this.ngOnInit()
        },
        error:(err)=>{}
      })
  }
  rejectOrder(){
    this.customOrderObj.message = this.customOrderForm.value.message
    this.orderService.rejectOrder(this.customOrderObj)
    .subscribe({
      next:(response)=>{
      },
      complete:()=>{
        this.customOrderForm.reset()
        this.rejectModal = false
        this.ngOnInit()
      },
      error:(err)=>{}
    })
  }

  toggleRejectModal(order:CustomOrderVM){
    this.rejectModal =! this.rejectModal
    this.customOrderObj = order
  }
  openConfirmModal(order:CustomOrderVM){
    this.confirmModal = true
    this.customOrderObj = order
  }




  closeModal(){
    this.userModal = false
    // this.confirmModal = false
    // this.rejectModal = false
    this.fullScreenImageModal = false
  }
}
