import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBasketShopping, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products-tab',
  templateUrl: './products-tab.component.html',
  styleUrls: ['./products-tab.component.scss']
})
export class ProductsTabComponent implements OnInit {

  faSearch = faSearch;
  faBasketShopping = faBasketShopping;
  @Input() isIndex: boolean = true;
  @Input() isBestSale: boolean = true;
  @Input() isRelated: boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  detail(id: number) {
    return this.router.navigate([`products/detail/${id}`]);
  }

}
