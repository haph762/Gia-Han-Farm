import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactMeRoutingModule } from './contact-me-routing.module';
import { ContactMeComponent } from './contact-me.component';
import { BreadcrumbModule } from 'src/app/breadcrumb/breadcrumb.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    ContactMeComponent
  ],
  imports: [
    CommonModule,
    ContactMeRoutingModule,
    BreadcrumbModule,
    FontAwesomeModule,
  ]
})
export class ContactMeModule { }
