import { Component, Input, OnInit } from '@angular/core';
import { faBasketShopping, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products-tab',
  templateUrl: './products-tab.component.html',
  styleUrls: ['./products-tab.component.scss']
})
export class ProductsTabComponent implements OnInit {

  faSearch = faSearch;
  faBasketShopping = faBasketShopping;
  @Input() isTabProduct: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
