import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonEDComponent } from './button-ed.component';

describe('ButtonEDComponent', () => {
  let component: ButtonEDComponent;
  let fixture: ComponentFixture<ButtonEDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonEDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonEDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
