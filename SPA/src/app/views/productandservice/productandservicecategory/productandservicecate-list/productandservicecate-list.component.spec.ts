import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductandservicecateListComponent } from './productandservicecate-list.component';

describe('ProductandservicecateListComponent', () => {
  let component: ProductandservicecateListComponent;
  let fixture: ComponentFixture<ProductandservicecateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductandservicecateListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductandservicecateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
