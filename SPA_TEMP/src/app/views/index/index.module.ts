import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { SliderComponent } from './slider/slider.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ProductsTabComponent } from './products-tab/products-tab.component';
import { CustomCenterComponent } from './custom-center/custom-center.component';
import { NewBlogComponent } from './new-blog/new-blog.component';
import { TopBrandsComponent } from './top-brands/top-brands.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';


@NgModule({
  declarations: [
    IndexComponent,
    SliderComponent,
    AboutMeComponent,
    ProductsTabComponent,
    CustomCenterComponent,
    NewBlogComponent,
    TopBrandsComponent
  ],
  imports: [
    CommonModule,
    IndexRoutingModule,
    FontAwesomeModule,
    CarouselModule.forRoot()
  ],
  exports:[
    ProductsTabComponent,
    NewBlogComponent
  ]
})
export class IndexModule { }
