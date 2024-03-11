import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { kitVM } from 'src/app/models/categories/kit-vm';
import { wishlistVM } from 'src/app/models/orders/wishlist-vm';
import { OrderService } from 'src/app/services/order/order.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
  encapsulation: ViewEncapsulation.None, // Apply styles globally

})
export class ProductsPageComponent implements OnInit {
  
  teamId!:number;
  allKits: kitVM[] = []; 
  displayedKits: kitVM[] = []; 
  pageSize = 10; 
  length = 0; 
  isDrawerVisible:boolean=false
  displaySignInError:boolean=false
  loading:boolean = true

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private route:ActivatedRoute,private productsService:ProductService, private orderService:OrderService
             , private snackBar:MatSnackBar) { }
             ngOnInit(): void {
              this.route.paramMap.subscribe(params => {
                this.teamId = parseInt(params.get('id')!);
                this.loading = true;
                
                this.productsService.getKitsByTeam(this.teamId).subscribe({
                  next: (response) => {
                    this.allKits = response; // Store all kits
                    this.length = this.allKits.length; // Update total length
                    this.updateDisplayedKits(0, this.pageSize); // Display the first page
                  },
                  error: (err) => {
                    console.error(err);
                    this.loading = false;
                  },
                  complete: () => {
                    this.loading = false;
                  }
                });
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

  updateDisplayedKits(startIndex: number, pageSize: number) {
    this.displayedKits = this.allKits.slice(startIndex, startIndex + pageSize);
  }
  

  handlePageEvent(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    this.updateDisplayedKits(startIndex, event.pageSize);
  }

}
