import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MyOrdersComponent {

  color: string = '#FFE520';
}
