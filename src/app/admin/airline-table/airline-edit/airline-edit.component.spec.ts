import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineEditComponent } from './airline-edit.component';

describe('AirlineEditComponent', () => {
  let component: AirlineEditComponent;
  let fixture: ComponentFixture<AirlineEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirlineEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
