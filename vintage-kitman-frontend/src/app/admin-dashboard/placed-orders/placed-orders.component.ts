import { Component } from '@angular/core';

@Component({
  selector: 'app-placed-orders',
  templateUrl: './placed-orders.component.html',
  styleUrls: ['./placed-orders.component.scss']
})
export class PlacedOrdersComponent {

  month:Date = new Date();
  Audits:any[] = []
}
