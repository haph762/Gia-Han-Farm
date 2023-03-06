import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  title: string = '';
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((v: any) => {
      this.title = v.title
    });

  }

}
