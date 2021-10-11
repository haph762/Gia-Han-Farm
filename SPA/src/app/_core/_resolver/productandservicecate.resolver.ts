import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ProductAndServiceCate } from '../_models/productandservicecate';
import { AlertUtilityService } from '../_services/alert-utility.service';
import { ProductandservicecateService } from '../_services/productandservicecate.service';

@Injectable({
  providedIn: 'root'
})
export class ProductandservicecateResolver implements Resolve<ProductAndServiceCate[]> {

  pageNumber =1;
  pageSize =10;
  text='';

  constructor(
    private productandservicecateService: ProductandservicecateService,
    private router: Router,
    private alertService: AlertUtilityService,
    private spinnerService: NgxSpinnerService
  ){}
  resolve(): Observable<ProductAndServiceCate[]> {
    this.spinnerService.show();
    return this.productandservicecateService.getAll(this.pageNumber, this.pageSize, this.text).pipe(
      tap(() => this.spinnerService.hide()),
      catchError(() => {
        this.alertService.error('Error','Problem retrieving data');
        this.router.navigate(['/dashboard']);
        this.spinnerService.hide();
        return of(null);
      }),
    );
  }
}
