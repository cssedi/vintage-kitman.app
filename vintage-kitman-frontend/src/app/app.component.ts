import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vintage-kitman-frontend';
  isVisible: boolean =false

  constructor() 
  {

    
  }

  user: any = localStorage.getItem("user")
  toggleDropDown()
  {
    this.isVisible=! this.isVisible
    console.log(this.isVisible)
  }
}
