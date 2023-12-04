import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { kitVM } from 'src/app/models/categories/kit-vm';
import { CategoriesService } from 'src/app/services/Categories/categories.service';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {
  
  leagueName!:string;
  kitArray:kitVM[]=[]

  constructor(private route:ActivatedRoute,private categoriesService:CategoriesService) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.leagueName = params.get('name')?.replace('%20', ' ')!;
      // Fetch products based on the leagueId using your ProductService
      this.categoriesService.getKitsByLeagueName(this.leagueName).subscribe({
        // Handle the retrieved products
        next:(reponse)=>
        {
          this.kitArray=reponse as kitVM[]
          console.log(this.leagueName)
          console.log(reponse)
        }
      }

      )
    });  }

}
