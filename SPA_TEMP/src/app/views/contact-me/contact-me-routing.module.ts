import { ContactMeComponent } from './contact-me.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    data:{
      title: 'Liên hệ',
    },
    component: ContactMeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactMeRoutingModule { }
