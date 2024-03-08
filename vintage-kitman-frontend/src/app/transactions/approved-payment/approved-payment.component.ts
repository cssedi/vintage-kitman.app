import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approved-payment',
  templateUrl: './approved-payment.component.html',
  styleUrls: ['./approved-payment.component.scss']
})
export class ApprovedPaymentComponent {

  //countdowntimer for 5 seconds
  countDown = 5;
  interval: any;

  constructor(private router: Router){
    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.countDown > 0) {
        this.countDown--;
      } else {
        clearInterval(this.interval);
        this.router.navigate(['/'])
        .then(() => {
          window.location.reload();
        });

      }
    },1000)
  }



}
