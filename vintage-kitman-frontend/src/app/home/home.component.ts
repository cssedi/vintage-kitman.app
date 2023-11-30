import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

  activeSlide = 0;
  autoSlideEnabled = true;

  carouselslides = [ // Add your slides here
  {
    image: 'https://d3nfwcxd527z59.cloudfront.net/content/uploads/2023/07/17113809/arsenal-23-24.jpg',
    content: {
      title: 'Get your favourite kits of the 2022/23 season',
      description: 'Some representative placeholder content for the first slide.',
      buttonText: 'Shop Now',
    },

  },
  {
    image: '/assets/images/AC milan carousel.png',
    content: {
      title: 'Second slide label',
      description: 'Some representative placeholder content for the second slide.',
      buttonText: 'Shop Now',
    },
    
  },
  {
    image: 'https://www.vibe.com/wp-content/uploads/2022/09/GettyImages-72477186-e1663360264985.jpg',
    content: {
      title: 'NBA jerseys from all past seasons',
      description: 'Some representative placeholder content for the second slide.',
      buttonText: 'Shop Now',
    },
    
  },
  // Add more slides as needed
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
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  formatTime(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
//carousel functions
  nextSlide() {
    this.activeSlide = (this.activeSlide + 1) % numberOfSlides;
    this.autoSlideEnabled = false; // Disable auto-slide when manual navigation occurs
    console.log('NExt slide clicked');
  }

  prevSlide() {
    this.activeSlide = (this.activeSlide - 1 + numberOfSlides) % numberOfSlides;
    this.autoSlideEnabled = false;
    console.log('Previous slide clicked');
  }

  enableAutoSlide() {
    this.autoSlideEnabled = true;
  }
}
