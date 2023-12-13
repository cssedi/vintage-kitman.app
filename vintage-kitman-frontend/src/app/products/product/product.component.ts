import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { kitVM } from 'src/app/models/categories/kit-vm';
import { Size } from 'src/app/models/categories/size';
import { CategoriesService } from 'src/app/services/Categories/categories.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  kit:kitVM=
  {
    name: '',
    frontImage: '',
    price: 0
  }

   sizeArray: Size[] = []
   customizedToggle:boolean = false;
   kitName:string=''
   hide:boolean = false;
   quantity:number = 1;


  constructor(private route:ActivatedRoute,private productsService:ProductService, private categoriesService:CategoriesService) { }
  
  ngOnInit(): void {
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

          console.log(this.kit)

        },
        complete:()=>{

        },
        error:(err)=> {
          console.log(err)
        },

      })

    });

    this.categoriesService.getAllSizes().subscribe({
      next:(response)=>{
        this.sizeArray = response as Size[]
        console.log(response)
      },
      complete:()=>{},
      error:(err)=>{console.log(err)}
    })
    
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
    console.log(this.customizedToggle)
  }

}
