import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { kitVM } from 'src/app/models/categories/kit-vm';
import { wishlistVM } from 'src/app/models/orders/wishlist-vm';
import { OrderService } from 'src/app/services/order/order.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {
  
  teamId!:number;
  kitArray:kitVM[]=[]
  isDrawerVisible:boolean=false
  displaySignInError:boolean=false

  constructor(private route:ActivatedRoute,private productsService:ProductService, private orderService:OrderService
             , private snackBar:MatSnackBar) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.teamId = parseInt(params.get('id')!);
      // Fetch products based on the leagueId using your ProductService
      this.productsService.getKitsByTeam(this.teamId).subscribe({
        // Handle the retrieved products
        next:(reponse)=>
        {
          this.kitArray=reponse as kitVM[]
          console.log(this.teamId)
          console.log(reponse)
        },
        complete:()=>{

        },
        error:(err)=> {
          console.log(err)
        },

      }

      )
    });  
  }

  addToWishlist(kit:kitVM)
  {
    const wishlistModel:wishlistVM={KitName: '',id: null}
    wishlistModel.KitName=kit.name
    //
    this.orderService.addToWishlist(wishlistModel).subscribe({
      next:(response)=>{
        console.log(response)
      },
      complete:()=>{
        this.snackBar.open("Added to wishlist", "Close", {duration:3000})
        this.activateRoute(kit)
      },
      error:(err)=>{
        console.log(err)
        this.displaySignInError=true
      }
    })
  }

  toggleDrawer(){
    this.isDrawerVisible=!this.isDrawerVisible
  }

  filterProducts(){
    
  }

  activateRoute(kit:kitVM){
    if(this.displaySignInError == true){
      return "/products"
    }
    else{
      return ['/product', kit.name];
    }
  }

  back(){
    window.history.back();
  }

}
