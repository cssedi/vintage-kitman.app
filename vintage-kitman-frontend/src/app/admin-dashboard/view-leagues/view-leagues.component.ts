import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeaguesVM } from 'src/app/models/categories/leagues-vm';
import { CategoriesService } from 'src/app/services/Categories/categories.service';

@Component({
  selector: 'app-view-leagues',
  templateUrl: './view-leagues.component.html',
  styleUrls: ['./view-leagues.component.scss']
})
export class ViewLeaguesComponent implements OnInit {
  Leagues: LeaguesVM[] = []
  leagueName: string = ''
  constructor(private categoriesService: CategoriesService, private route:ActivatedRoute) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.leagueName = params.get('name')!;
      // Fetch products based on the leagueId using your ProductService
      this.categoriesService.getLeagueBySportName(this.leagueName).subscribe({
        // Handle the retrieved products
        next: (reponse) => {
          this.Leagues = reponse as LeaguesVM[]
          console.log(this.Leagues)
        },
        complete: () => {

        },
        error: (err) => {
          console.log(err)
        },

      }

      )
    });

 
  }


}
