import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { timeInterval } from 'rxjs';
import { kitVM } from 'src/app/models/categories/kit-vm';
import { Size } from 'src/app/models/categories/size';
import { CartItem } from 'src/app/models/orders/CartItem-vm';
import { CategoriesService } from 'src/app/services/Categories/categories.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/order/order.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

   kit:kitVM= {name: '', frontImage: '', price: 0, productType: null,teamId: 0,productTypeId: 0}
   cartItem:CartItem={KitName: '', Quantity: 0, isCustomed: false, SizeId: '', CustomName: '', CustomNumber: 0, KitPrice: 0,KitImage: ''}
   sizeArray: Size[] = []
   customizedToggle:boolean = false;
   kitName:string=''
   quantity:number = 1;
   cartForm!:FormGroup
   displaySuccess:boolean = false;
   fullscreenImageModal:boolean=false;


  constructor(private route:ActivatedRoute,private productsService:ProductService, private orderService:OrderService, private fb:FormBuilder,
              private location:Location,  private cartService: CartService) { }
  
  ngOnInit(): void {
    //get kits
    this.route.paramMap.subscribe(params => {
      // this.kitName = params.get('name')?.replace('%20', ' ').replace('%2F', '/')!;
      this.kitName = params.get('name')!;

      // Fetch products based on the kitname using ProductService
      this.productsService.getKitByName(this.kitName).subscribe({
        // Handle the retrieved products
        next:(response)=>
        {
          this.kit.frontImage = response.frontImage
          this.kit.name = response.name
          this.kit.price = response.price
          this.kit.productType = response.productType
          console.log(this.kit)


        },
        complete:()=>{

        },
        error:(err)=> {
          console.log(err)
        },

      })

    });

    //form
    this.cartForm = this.fb.group({
      size: ['', Validators.required],
      quantity: [this.quantity, [Validators.required, Validators.min(1)]],
      customName: [''],
      customNumber: [0]
    });
    
    if (this.customizedToggle) 
    {
      this.cartForm.get('customName')!.setValidators([Validators.required]);
      this.cartForm.get('customNumber')!.setValidators([Validators.required, Validators.min(1), Validators.max(99)]);
    }
    // Update the validation status
    this.cartForm.get('customName')!.updateValueAndValidity();
    this.cartForm.get('customNumber')!.updateValueAndValidity();
    
    this.updateFormValidators();
  }

  increaseQuantity()
  {
    this.quantity++
  }
  decreaseQuantity()
  {
    this.quantity--
    if(this.quantity<1){
      this.quantity=1
    }
  }
  toggleCustom(){
    this.customizedToggle = !this.customizedToggle
    this.updateFormValidators() 
 }

  updateFormValidators(): void {
    if (this.customizedToggle) {
      this.cartForm.get('customName')!.setValidators([Validators.required]);
      this.cartForm.get('customNumber')!.setValidators([Validators.required, Validators.min(1), Validators.max(99)]);
    } else {
      this.cartForm.get('customName')!.clearValidators();
      this.cartForm.get('customNumber')!.clearValidators();
    }
  
    this.cartForm.get('customName')!.updateValueAndValidity();
    this.cartForm.get('customNumber')!.updateValueAndValidity();
  }

  addToCart(){
    this.cartItem.KitName = this.kit.name
    this.cartItem.KitImage = this.kit.frontImage
    this.cartItem.KitPrice = this.kit.price
    if(this.customizedToggle)
    {
      this.cartItem.isCustomed = true
      this.cartItem.KitPrice = this.kit.price + 50
    }
    this.cartItem.Quantity = this.quantity
    this.cartItem.SizeId = this.cartForm.value.size
    this.cartItem.CustomName = this.cartForm.value.customName
    this.cartItem.CustomNumber = this.cartForm.value.customNumber
    debugger
    if (this.cartForm.valid) {
      var cart = JSON.parse(localStorage.getItem('cart')!) || [];
    
      // Check if the cart already contains the item
      var existingItemIndex = -1;
      cart.forEach((item: CartItem, index: number) => {
        if (
          item.KitName == this.cartItem.KitName &&
          item.isCustomed == this.cartItem.isCustomed &&
          item.SizeId == this.cartItem.SizeId &&
          item.CustomName == this.cartItem.CustomName &&
          item.CustomNumber == this.cartItem.CustomNumber
        ) {
          existingItemIndex = index;
        }
      });
    
      if (existingItemIndex !== -1) {
        // If item exists, increase its quantity
        cart[existingItemIndex].Quantity += this.cartItem.Quantity;
      } else {
        // If item doesn't exist, add it to the cart
        cart.push(this.cartItem);
      }
    
      // Update the cartItems count in the service
      this.cartService.updateCartItemsCount(cart.length);
    
      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
    
      this.location.back();
    } else {
      console.log('invalid form');
    }
    


}

viewSizeChart(){
  this.fullscreenImageModal = true
}

closeSizeChart(){
  this.fullscreenImageModal = false

}

}
