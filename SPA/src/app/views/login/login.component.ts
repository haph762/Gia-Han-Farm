import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertUtilityService } from '../../_core/_services/alert-utility.service';
import { AuthService } from '../../_core/_services/auth.service';

@UntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent { 
  user: any = {};

  constructor(
    private authService: AuthService,
    private spinnerService: NgxSpinnerService,
    private alert: AlertUtilityService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }
  login() {
    this.spinnerService.show();
    this.authService.login(this.user.userName, this.user.password)
      .pipe(untilDestroyed(this))
      .subscribe(
        (next) => {
          this.alert.success('Success', 'Login Success!!');
          this.spinnerService.hide();
        },
        (error) => {
          this.alert.error('Error', 'Username or Password incorrect!!');
          this.spinnerService.hide();
        },
        () => {
          this.spinnerService.hide();
          this.router.navigate(['/dashboard']);
        }
      );
  }
}
