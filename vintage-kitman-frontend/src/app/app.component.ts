import { Component, OnInit } from '@angular/core';
import { SportsVM } from './models/categories/sports-vm';
import { CategoriesService } from './services/Categories/categories.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit {
  title = 'vintage-kitman-frontend';
  isVisible: boolean =false
  isUserVisible: boolean =false
  isDoubleDropDownVisible: boolean =false
  sports: SportsVM[]=[]

  constructor(private categoriesService: CategoriesService) 
  {}
  ngOnInit(): void {
    this.categoriesService.getAllSports().subscribe({
      next: (response)=>{

        this.sports=response as SportsVM[]
        console.log(response)

        this.sports.forEach(sport => {
          sport.isDoubleDropDownVisible = false;
        });

      }
    })
  }

  user: any = localStorage.getItem("user")
  toggleDropDown()
  {
    this.isVisible=! this.isVisible
    this.isUserVisible=false
    this.isDoubleDropDownVisible=false
    console.log('dropdown is' +  this.isVisible)
  }
// Initialize visibility status for each sport


toggleDoubleDropDown(sport: SportsVM) {
  sport.isDoubleDropDownVisible = !sport.isDoubleDropDownVisible;
  console.log(`Double dropdown for ${sport.name} is ${sport.isDoubleDropDownVisible}`);
}

  toggleUserDropDown(){
    this.isUserVisible=! this.isUserVisible
    this.isVisible=false
    console.log(this.isVisible)
  }

  collapseAll(){
    this.isVisible=false
    this.isUserVisible=false
    this.isDoubleDropDownVisible=false
  }

}
