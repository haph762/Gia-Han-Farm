import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBlogDetailComponent } from './new-blog-detail.component';

describe('NewBlogDetailComponent', () => {
  let component: NewBlogDetailComponent;
  let fixture: ComponentFixture<NewBlogDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBlogDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBlogDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
