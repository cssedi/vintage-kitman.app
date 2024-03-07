import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllCustomOrdersComponent } from './view-all-custom-orders.component';

describe('ViewAllCustomOrdersComponent', () => {
  let component: ViewAllCustomOrdersComponent;
  let fixture: ComponentFixture<ViewAllCustomOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAllCustomOrdersComponent]
    });
    fixture = TestBed.createComponent(ViewAllCustomOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
