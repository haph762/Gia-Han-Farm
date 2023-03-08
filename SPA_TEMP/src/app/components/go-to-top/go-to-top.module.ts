import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoToTopComponent } from './go-to-top.component';



@NgModule({
  declarations: [
    GoToTopComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    GoToTopComponent
  ]
})
export class GoToTopModule { }
