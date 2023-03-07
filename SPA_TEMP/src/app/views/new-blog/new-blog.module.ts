import { IndexModule } from './../index/index.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewBlogRoutingModule } from './new-blog-routing.module';
import { NewBlogComponent } from './new-blog.component';
import { BreadcrumbModule } from 'src/app/breadcrumb/breadcrumb.module';
import { NewBlogDetailComponent } from './new-blog-detail/new-blog-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    NewBlogComponent,
    NewBlogDetailComponent
  ],
  imports: [
    CommonModule,
    NewBlogRoutingModule,
    BreadcrumbModule,
    IndexModule,
    FontAwesomeModule,
  ]
})
export class NewBlogModule { }
