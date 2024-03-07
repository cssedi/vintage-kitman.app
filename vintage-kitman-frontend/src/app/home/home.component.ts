import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { wishlistVM } from '../models/orders/wishlist-vm';
import { kitVM } from '../models/categories/kit-vm';
import { OrderService } from '../services/order/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OnStockKitVM } from '../models/orders/OnStockKit-vm';

const numberOfSlides = 3;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home.component.scss'],
  
})
export class HomeComponent implements OnInit, OnDestroy {
  countdown: { days: number, hours: number, minutes: number, seconds: number } = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  private unsubscribe$ = new Subject<void>();

  constructor(private orderService:OrderService, private snackBar:MatSnackBar) {  }

  activeSlide = 0;
  autoSlideEnabled = true;
  displaySignInError:boolean=false
  onStockKits:OnStockKitVM[]=[]
  viewBulkOrderModal: boolean = false;

  carouselslides = [ // Add your slides here
  {
    image: '/assets/images/arsenal-carouselimg.jpg',
    content: {
      title: 'Get your favourite kits of the 2022/23 Premier League season',
      description: 'Some representative placeholder content for the first slide.',
      buttonText: 'Shop Now',
      route: '/products/1',
    },

  },
  {
    // image: '/assets/images/AC milan carousel.png',
    image:'/assets/images/la-liga-carousel.jpg',
    content: {
      title: `La Liga's classic and modern kits available now!`,
      description: 'Some representative placeholder content for the second slide.',
      buttonText: 'Shop Now',
      route: '/teams/La Liga',
    },
    
  },
  {
    image: 'https://www.vibe.com/wp-content/uploads/2022/09/GettyImages-72477186-e1663360264985.jpg',
    content: {
      title: 'NBA jerseys from all past seasons',
      description: 'Some representative placeholder content for the second slide.',
      buttonText: 'Shop Now',
      route: '/sport-teams/Basketball',
    },
    
  },

  // Add more slides as needed

];

 premTeams = [
  { 
    TeamId: 1, 
    Name: "Arsenal", 
    Logo: "https://1000logos.net/wp-content/uploads/2016/10/Arsenal-Logo-768x480.png" 
  },
  { 
    TeamId: 2, 
    Name: "Manchester City", 
    Logo: "https://1000logos.net/wp-content/uploads/2017/05/Manchester-City-Logo-768x480.png" 
  },
  { 
    TeamId: 3, 
    Name: "Liverpool", 
    Logo: "https://1000logos.net/wp-content/uploads/2017/04/Logo-Liverpool-768x480.png" 
  },
  { 
    TeamId: 4, 
    Name: "Tottenham Hotspur", 
    Logo: "https://1000logos.net/wp-content/uploads/2018/06/Tottenham_Hotspur_Logo.png" 
  },
  { 
    TeamId: 5, 
    Name: "Manchester United", 
    Logo: "https://1000logos.net/wp-content/uploads/2017/03/Manchester-United-Logo-493x500.png" 
  },
  { 
    TeamId: 24, 
    Name: "Chelsea", 
    Logo: "https://1000logos.net/wp-content/uploads/2016/11/Chelsea-Logo-640x400.png" 
  }
];

 nationalKits = [
  { 
    KitId: 44, 
    ProductTypeId: 3, 
    TeamId: 17, 
    name: "Germany Home Jersey 1994",
    frontImage: "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/1024.jpg",
    price: 900
  },
  { 
    KitId: 41, 
    ProductTypeId: 3, 
    TeamId: 16, 
    name: "France Home Jersey 1998",
    frontImage: "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/1059.jpg",
    price: 900
  },
  { 
    KitId: 38, 
    ProductTypeId: 3, 
    TeamId: 15, 
    name: "England Home Jersey 1990",
    frontImage: "https://webpixelscdn.fra1.digitaloceanspaces.com/the-locker-room/assets/1039.jpg",
    price: 900
  }
];

  ngOnInit() {
    // Set the end of the month date
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59);
    
    // Calculate the time remaining until the end of the month
    var timeRemaining = endOfMonth.getTime() - new Date().getTime();
    
    // Update the countdown every second
    interval(1000)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.countdown.days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        this.countdown.hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.countdown.minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        this.countdown.seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        
        timeRemaining -= 1000;

        // If the timer reaches zero, you can perform additional actions here.
        if (timeRemaining <= 0) {
          // Timer has reached zero, you might want to do something here.
          this.unsubscribe$.next();
          this.unsubscribe$.complete();
        }
      });

      interval(5000) // Adjust the interval duration as needed (e.g., 5000 milliseconds for 5 seconds)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        if (this.autoSlideEnabled) {
          this.nextSlide();
        }
      })
      //get on stock kits
      this.orderService.homePageOnStockKits()
      .subscribe({
        next:(value)=> {
          this.onStockKits = value as OnStockKitVM[]
        },
        complete:()=>{},
        error:(err)=>{}
      })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  formatTime(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
//carousel functions
nextSlide(manualNavigation: boolean = false) {
  this.activeSlide = (this.activeSlide + 1) % numberOfSlides;
  if (manualNavigation) {
    this.autoSlideEnabled = false; // Disable auto-slide when manual navigation occurs
  }
}

prevSlide(manualNavigation: boolean = false) {
  this.activeSlide = (this.activeSlide - 1 + numberOfSlides) % numberOfSlides;
  if (manualNavigation) {
    this.autoSlideEnabled = false;
  }
}

  enableAutoSlide() {
    this.autoSlideEnabled = true;
  }

  addToWishlist(kit:any)
  {
    const wishlistModel:wishlistVM={KitName: '',id: null}
    wishlistModel.KitName=kit.name
    //
    this.orderService.addToWishlist(wishlistModel).subscribe({
      next:(response)=>{
        console.log(response)
      },
      complete:()=>{
        this.snackBar.open("Added to wishlist", "Close", {duration:3000})
        this.activateRoute(kit)
      },
      error:(err)=>{
        console.log(err)
        this.displaySignInError=true
      }
    })
  }

  activateRoute(kit:kitVM){
    if(this.displaySignInError == true){
      return "/products"
    }
    else{
      return ['/product', kit.name];
    }
  }

  openBulkOrderModal(){
    this.viewBulkOrderModal = true;
  }
  closeBulkOrderModal(){
    this.viewBulkOrderModal = false;
  }
}
