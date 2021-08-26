import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Users } from '../_models/users';
import { AlertUtilityService } from '../_services/alert-utility.service';
import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<Users[]> {
  pageNumber =1;
  pageSize =10;
  text='';
  constructor(
    private userService: UserService,
    private router: Router,
    private alertService: AlertUtilityService,
  ){}
  resolve(route: ActivatedRouteSnapshot): Observable<Users[]> {
    return this.userService.getUsers(this.pageNumber, this.pageSize, this.text).pipe(
      catchError(error =>{
        this.alertService.error('Error','Problem retrieving data');
        this.router.navigate(['/dashboard']);
        return of(null);
      })
    );
  }
}
