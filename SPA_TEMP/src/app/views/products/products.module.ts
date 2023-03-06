import { IndexModule } from './../index/index.module';
import { BreadcrumbModule } from 'src/app/breadcrumb/breadcrumb.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';


@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    BreadcrumbModule,
    IndexModule
  ]
})
export class ProductsModule { }
