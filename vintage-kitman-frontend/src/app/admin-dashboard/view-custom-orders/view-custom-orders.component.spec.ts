import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomOrdersComponent } from './view-custom-orders.component';

describe('ViewCustomOrdersComponent', () => {
  let component: ViewCustomOrdersComponent;
  let fixture: ComponentFixture<ViewCustomOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCustomOrdersComponent]
    });
    fixture = TestBed.createComponent(ViewCustomOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
