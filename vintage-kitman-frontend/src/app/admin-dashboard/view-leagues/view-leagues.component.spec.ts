import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLeaguesComponent } from './view-leagues.component';

describe('ViewLeaguesComponent', () => {
  let component: ViewLeaguesComponent;
  let fixture: ComponentFixture<ViewLeaguesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewLeaguesComponent]
    });
    fixture = TestBed.createComponent(ViewLeaguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
