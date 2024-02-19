import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnStockKitsComponent } from './on-stock-kits.component';

describe('OnStockKitsComponent', () => {
  let component: OnStockKitsComponent;
  let fixture: ComponentFixture<OnStockKitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnStockKitsComponent]
    });
    fixture = TestBed.createComponent(OnStockKitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
