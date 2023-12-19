import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SportsVM } from './models/categories/sports-vm';
import { CategoriesService } from './services/Categories/categories.service';
import { CartItem } from './models/orders/CartItem-vm';
import { CartService } from './services/cart/cart.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit {
  //drop downs
  isVisible: boolean =false
  isUserVisible: boolean =false
  isDoubleDropDownVisible: boolean =false
  userDetails = {name:'', surname:'', email:''}
  sports: SportsVM[]=[]
  cartItems: number =0;
  cart: CartItem[] = []
  token: boolean = false;
  admin:boolean = false;

  constructor(private categoriesService: CategoriesService,  private cartService: CartService, private route: Router) 
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

    if (!localStorage.getItem('cart')) 
    {
      localStorage.setItem('cart', JSON.stringify([]));
    }
    // Fetch the cartItems count from local storage
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartItems = storedCart.length;

    // Subscribe to the cartItemsCount$ observable
    this.cartService.cartItemsCount$.subscribe((count) => {
      this.cartItems = count;
    });

    //check for token
    if(localStorage.getItem("6gj6KgI7l0ffhv") == "true")
    {
      this.admin = true  
    }
    else if(localStorage.getItem("token")){
      this.token=true
    }
    this.userDetails = JSON.parse(localStorage.getItem("user") || '{}')
  }


  signOut(){
    localStorage.clear()
    window.location.reload()
    
  }




  toggleDropDown()
  {
    this.isVisible=! this.isVisible
    this.isUserVisible=false
    if(this.isVisible){
      this.isDoubleDropDownVisible=false
    }
    console.log('dropdown is' +  this.isVisible)
  }
// Initialize visibility status for each sport
  toggleDoubleDropDown(sport: SportsVM) {
    sport.isDoubleDropDownVisible = !sport.isDoubleDropDownVisible;
  }

  toggleUserDropDown(){
    this.isUserVisible=! this.isUserVisible
    this.isVisible=false
    this.isDoubleDropDownVisible
    console.log(this.isVisible)
  }

  collapseAll(){
    this.isVisible=false
    this.isUserVisible=false
    this.isDoubleDropDownVisible=false
  }

}
