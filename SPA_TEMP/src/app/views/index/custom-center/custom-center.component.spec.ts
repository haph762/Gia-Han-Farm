import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCenterComponent } from './custom-center.component';

describe('CustomCenterComponent', () => {
  let component: CustomCenterComponent;
  let fixture: ComponentFixture<CustomCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
