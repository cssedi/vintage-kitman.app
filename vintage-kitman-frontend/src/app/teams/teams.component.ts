import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product/product.service';
import { TeamsVM } from '../models/categories/teams-vm';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  leagueName!:string;
  teamArray:TeamsVM[]=[]

  constructor(private route:ActivatedRoute,private productsService:ProductService) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.leagueName = params.get('name')?.replace('%20', ' ')!;
      // Fetch products based on the leagueId using your ProductService
      this.productsService.getTeamsByLeagueName(this.leagueName).subscribe({
        // Handle the retrieved products
        next:(reponse)=>
        {
          this.teamArray=reponse as TeamsVM[]
          console.log(this.leagueName)
          console.log(reponse)
        }
      }

      )
    });  
  }
}
