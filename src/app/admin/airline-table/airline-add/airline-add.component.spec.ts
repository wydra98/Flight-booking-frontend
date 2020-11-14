import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineAddComponent } from './airline-add.component';

describe('AirlineAddComponent', () => {
  let component: AirlineAddComponent;
  let fixture: ComponentFixture<AirlineAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirlineAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
