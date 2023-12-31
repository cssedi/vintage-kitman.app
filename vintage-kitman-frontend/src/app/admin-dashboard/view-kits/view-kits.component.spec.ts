import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewKitsComponent } from './view-kits.component';

describe('ViewKitsComponent', () => {
  let component: ViewKitsComponent;
  let fixture: ComponentFixture<ViewKitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewKitsComponent]
    });
    fixture = TestBed.createComponent(ViewKitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
