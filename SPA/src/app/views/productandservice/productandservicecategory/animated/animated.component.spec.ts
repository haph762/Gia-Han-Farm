/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AnimatedComponent } from './animated.component';

describe('AnimatedComponent', () => {
  let component: AnimatedComponent;
  let fixture: ComponentFixture<AnimatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
