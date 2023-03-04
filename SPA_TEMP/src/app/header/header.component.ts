import { Component, OnInit } from '@angular/core';
import { faBars, faBasketShopping, faChevronDown, faChevronUp, faClose, faSearch, faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = 'my-app';
  faSearch = faSearch;
  faUserPlus = faUserPlus;
  faBasketShopping = faBasketShopping;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  faBars = faBars;
  faClose = faClose;
  constructor() { }

  ngOnInit(): void {
  }

}
