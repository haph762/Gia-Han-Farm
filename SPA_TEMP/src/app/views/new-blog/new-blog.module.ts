import { IndexModule } from './../index/index.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewBlogRoutingModule } from './new-blog-routing.module';
import { NewBlogComponent } from './new-blog.component';
import { BreadcrumbModule } from 'src/app/breadcrumb/breadcrumb.module';


@NgModule({
  declarations: [
    NewBlogComponent
  ],
  imports: [
    CommonModule,
    NewBlogRoutingModule,
    BreadcrumbModule,
    IndexModule
  ]
})
export class NewBlogModule { }
