import { Injectable } from '@angular/core';
import { INavData } from '@coreui/angular';
import { Roles } from './_core/_constants/roles.constant';

@Injectable({
  providedIn: 'root'
})
export class NavItem {
  navItems: INavData[] = [];
  hasReport: boolean = false;
  hasUser: boolean = false;
  constructor() { }

  getNav() {
    //get user
    const user: any = JSON.parse(localStorage.getItem('user'));
    const roles: string[] = user.roles;
    this.navItems = [];

    //navs
    const navItemDashboard = {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer'
    };
    //users
    const navItemUser = {
      name: '1. Settings',
      url: 'settings',
      icon: 'icon-user',
      children: []
    };
    if (roles.includes(Roles.sets_UserList)) {
      const navItem = {
        name: '1.1 User List',
        url: '/settings/user-list',
        class: 'menu-margin'
      };
      navItemUser.children.push(navItem);
    }

    //News
    const navItemNews = {
      name: '2. Posts',
      url: 'news',
      icon: 'cil-newspaper',
      children: []
    };
    if (roles.includes(Roles.sets_NewsList)) {
      const navItem = {
        name: '2.1 News List',
        url: '/posts/news/list',
        class: 'menu-margin'
      };
      navItemNews.children.push(navItem);
    }
    const navItem = {
      name: '2.2 Intro List',
      url: '/posts/intro/list',
      class: 'menu-margin'
    };
    navItemNews.children.push(navItem);

    //users
    const navItemProducts = {
      name: '3. Products and Services',
      url: 'products',
      icon: 'cil-child',
      children: []
    };
    if (roles.includes(Roles.sets_Product_Service_CategoryList)) {
      const navItem = {
        name: '3.1 Products and Services Category List',
        url: '/products/product-service-category',
        class: 'menu-margin'
      };
      navItemProducts.children.push(navItem);
    }


    //push navs
    this.navItems.push(navItemDashboard);
    this.navItems.push(navItemUser);
    this.navItems.push(navItemNews);
    this.navItems.push(navItemProducts);
    return this.navItems;
  }
}