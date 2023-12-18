import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { kitVM } from 'src/app/models/categories/kit-vm';
import { CartService } from 'src/app/services/cart/cart.service';
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

  constructor(private route:ActivatedRoute,private productsService:ProductService) { }
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
  toggleDrawer(){
    this.isDrawerVisible=!this.isDrawerVisible
  }

  filterProducts(){
    
  }

}
