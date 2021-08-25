import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../../_core/_models/users';
import { AlertUtilityService } from '../../_core/_services/alert-utility.service';
import { AuthService } from '../../_core/_services/auth.service';
import { commonPerProject } from '../../_core/_untility/common-per-project';
import { NavItem } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {

  public sidebarMinimized = false;
  public navItems = [];
  public imageUser = '';
  currentUser: Users = JSON.parse(localStorage.getItem('user'));

  constructor(
    private authService: AuthService,
    private router: Router,
    private nav: NavItem,
    private alert: AlertUtilityService,
  ){
    this.navItems = this.nav.getNav();
    this.imageUser = this.currentUser.image == null ? commonPerProject.imageUserDefault
                                    : commonPerProject.imageUserUrl + this.currentUser.image;
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.alert.success('Success', 'Logged out');
    this.router.navigate(['/login']);
  }
}
