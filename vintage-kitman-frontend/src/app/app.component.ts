import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vintage-kitman-frontend';
  isVisible: boolean =false
  isUserVisible: boolean =false

  constructor() 
  {

    
  }

  user: any = localStorage.getItem("user")
  toggleDropDown()
  {
    this.isVisible=! this.isVisible
    this.isUserVisible=false
    console.log(this.isVisible)
  }

  toggleUserDropDown(){
    this.isUserVisible=! this.isUserVisible
    this.isVisible=false
    console.log(this.isVisible)
  }
}
