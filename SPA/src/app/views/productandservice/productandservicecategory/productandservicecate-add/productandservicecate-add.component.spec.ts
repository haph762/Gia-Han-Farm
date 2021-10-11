import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductandservicecateAddComponent } from './productandservicecate-add.component';

describe('ProductandservicecateAddComponent', () => {
  let component: ProductandservicecateAddComponent;
  let fixture: ComponentFixture<ProductandservicecateAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductandservicecateAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductandservicecateAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
