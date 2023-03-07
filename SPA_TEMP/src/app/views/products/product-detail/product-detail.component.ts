import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPlus, faSubtract } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  title: string = '';
  subTitle: string = '';
  faSubtract = faSubtract;
  faPlus = faPlus;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((v: any) => {
      this.title = v.title
      this.subTitle = v.subTitle
    });
  }

}
