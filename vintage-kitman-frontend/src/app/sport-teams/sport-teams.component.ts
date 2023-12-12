import { Component, OnInit } from '@angular/core';
import { TeamsVM } from '../models/categories/teams-vm';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product/product.service';
import { CategoriesService } from '../services/Categories/categories.service';

@Component({
  selector: 'app-sport-teams',
  templateUrl: './sport-teams.component.html',
  styleUrls: ['./sport-teams.component.scss']
})
export class SportTeamsComponent implements OnInit{

  teamArray:TeamsVM[] =[]
  sportName:string = ''
  constructor(private route:ActivatedRoute,private categoriesService:CategoriesService) { }
    
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.sportName = params.get('name')?.replace('%20', ' ')!;
      // Fetch products based on the leagueId using your ProductService
      this.categoriesService.getTeamsBySportName(this.sportName).subscribe({
        // Handle the retrieved products?
        next:(reponse)=>
        {
          this.teamArray=reponse as TeamsVM[]
          console.log(this.sportName)
          console.log(reponse)  
        }
      }

      )
    });  
  }

}
