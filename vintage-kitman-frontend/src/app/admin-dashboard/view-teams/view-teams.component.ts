import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamsVM } from 'src/app/models/categories/teams-vm';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-view-teams',
  templateUrl: './view-teams.component.html',
  styleUrls: ['./view-teams.component.scss']
})
export class ViewTeamsComponent implements OnInit {

  leagueName!:string;
  teamArray:TeamsVM[]=[]

  constructor(private route:ActivatedRoute,private productsService:ProductService) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.leagueName = params.get('name')!;
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
