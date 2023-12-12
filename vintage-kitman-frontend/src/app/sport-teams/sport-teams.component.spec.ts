import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportTeamsComponent } from './sport-teams.component';

describe('SportTeamsComponent', () => {
  let component: SportTeamsComponent;
  let fixture: ComponentFixture<SportTeamsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SportTeamsComponent]
    });
    fixture = TestBed.createComponent(SportTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
