import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductandservicecategoryRoutingModule } from './productandservicecategory-routing.module';
import { ProductandservicecateListComponent } from './productandservicecate-list/productandservicecate-list.component';
import { ProductandservicecateAddComponent } from './productandservicecate-add/productandservicecate-add.component';
import { ProductandservicecateEditComponent } from './productandservicecate-edit/productandservicecate-edit.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TooltipModule } from 'ngx-bootstrap/tooltip';


@NgModule({
  declarations: [
    ProductandservicecateListComponent,
    ProductandservicecateAddComponent,
    ProductandservicecateEditComponent
  ],
  imports: [
    CommonModule,
    ProductandservicecategoryRoutingModule,
    NgxSpinnerModule,
    TooltipModule.forRoot(),
  ]
})
export class ProductandservicecategoryModule { }
