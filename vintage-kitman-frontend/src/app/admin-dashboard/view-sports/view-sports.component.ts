import { Component, OnInit } from '@angular/core';
import { SportsVM } from 'src/app/models/categories/sports-vm';
import { CategoriesService } from 'src/app/services/Categories/categories.service';

@Component({
  selector: 'app-view-sports',
  templateUrl: './view-sports.component.html',
  styleUrls: ['./view-sports.component.scss']
})
export class ViewSportsComponent implements OnInit {

  month:Date = new Date();
  Sports:SportsVM[] = []
  constructor(private categoriesService:CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService.getAllSports().subscribe(
      {
        next:(response)=>
        {
          this.Sports = response as SportsVM[]
          console.log(this.Sports)
        },
        complete:()=>{},
        error:(err)=>{console.log(err)}

       }
    )  
  
  }


}
