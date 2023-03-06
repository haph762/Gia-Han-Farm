import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutMeRoutingModule } from './about-me-routing.module';
import { AboutMeComponent } from './about-me.component';
import { BreadcrumbModule } from 'src/app/breadcrumb/breadcrumb.module';


@NgModule({
  declarations: [
    AboutMeComponent,
  ],
  imports: [
    CommonModule,
    AboutMeRoutingModule,
    BreadcrumbModule
  ]
})
export class AboutMeModule { }
