import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SportsVM } from './models/categories/sports-vm';
import { CategoriesService } from './services/Categories/categories.service';
import { CartItem } from './models/orders/CartItem-vm';
import { CartService } from './services/cart/cart.service';
import { Route, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './services/authentication/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit, AfterViewInit {
  //drop downs
  title!:string
  isVisible: boolean =false
  isUserVisible: boolean =false
  isDoubleDropDownVisible: boolean =false
  //auth
  isAdmin:boolean = false
  isAuthenticated:boolean = false
  userDetails = {name:'', surname:'', email:''}
  //arrays
  sports: SportsVM[]=[]
  cartItems: number =0;
  cart: CartItem[] = []
  //search
  searchForm!:FormGroup

  constructor(private categoriesService: CategoriesService,  private cartService: CartService, private fb: FormBuilder,
              private router:Router, private authService:AuthService){}


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

    this.userDetails = JSON.parse(localStorage.getItem("user") || '{}')
    //initialise search form
    this.searchForm = this.fb.group({
      searchTerm: ['']
    })

    // Check localStorage for authentication status and admin status
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      // Update your component property based on the authentication status
      this.isAuthenticated = isAuthenticated;
      if(localStorage.getItem("isAuthenticated") == "true")
        this.isAuthenticated = true
      else
        this.isAuthenticated = false
    });

    this.authService.isAdmin$.subscribe((isAdmin) => {
      // Update your component property based on the admin status
      this.isAdmin = isAdmin;
      if(localStorage.getItem("isAdmin") == "true")
        this.isAdmin = true
      else
        this.isAdmin = false
    });
    
  }

  ngAfterViewInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem("user") || '{}')
  }
  
  signOut(){
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    localStorage.removeItem("isAdmin")
    localStorage.removeItem("isAuthenticated")
    
    window.location.reload()
    
  }



  //dropdown functions
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

  //search functions
  search(searchTerm:string){
    searchTerm = this.searchForm.get('searchTerm')?.value
    this.router.navigate(['search-query/'+searchTerm])
  }

}
