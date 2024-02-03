import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationUser } from 'src/app/models/authentication/appuser';
import { CustomOrderVM } from 'src/app/models/orders/custom-order-vm';
import { AuthService } from 'src/app/services/authentication/auth.service';
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
  userObj: ApplicationUser= {id: '', userName: '', email: '', phoneNumber: '', name: '', surname: '', address: '', addresses: [], customOrders: [], wishlist:null};
  customOrderObj: CustomOrderVM={customOrderId: 0, size: '', name: '', quantity: 0, image: '', isSourcable: null, customName: null, customNumber: null, message: null, user: null, isViewed: null,customOrderStatus: null}
  //modals
  userModal:boolean = false;
  confirmModal:boolean = false;
  rejectModal:boolean = false;
  fullscreenImageModal:boolean=false;
  //form
  customOrderForm!: FormGroup;

  constructor(private ordersService:OrderService, private authService:AuthService, private fb:FormBuilder) {  }

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
      this.customOrderForm = this.fb.group({
        message: ['', Validators.required]
      })
  }

    confirmOrder(){
      this.customOrderObj.message = this.customOrderForm.value.message
      console.log(this.customOrderObj)
      this.ordersService.confirmCustomOrder(this.customOrderObj).subscribe(
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
      this.ordersService.rejectOrder(this.customOrderObj)
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

    closeModal(){
      this.userModal = false
      this.confirmModal = false
      this.rejectModal = false
      this.fullscreenImageModal = false
    }
    viewImageFullScreen(order:CustomOrderVM){
      this.fullscreenImageModal =! this.fullscreenImageModal
      console.log(this.fullscreenImageModal)
      this.customOrderObj = order

    }

    toggleRejectModal(order:CustomOrderVM){
      this.rejectModal =! this.rejectModal
      this.customOrderObj = order
    }
    openConfirmModal(order:CustomOrderVM){
      this.confirmModal = true
      this.customOrderObj = order
    }

    

}
