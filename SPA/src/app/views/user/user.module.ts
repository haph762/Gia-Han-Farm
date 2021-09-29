import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserResolver } from '../../_core/_resolver/user.resolver';
import { UserGuard } from '../../_core/_guard/user.guard';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
  providers:[
    UserResolver,
    UserGuard
  ]
})
export class UserModule { }
