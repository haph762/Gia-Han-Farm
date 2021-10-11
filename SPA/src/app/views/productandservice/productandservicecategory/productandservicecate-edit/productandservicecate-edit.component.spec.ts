import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductandservicecateEditComponent } from './productandservicecate-edit.component';

describe('ProductandservicecateEditComponent', () => {
  let component: ProductandservicecateEditComponent;
  let fixture: ComponentFixture<ProductandservicecateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductandservicecateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductandservicecateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
