import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faClock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new-blog-detail',
  templateUrl: './new-blog-detail.component.html',
  styleUrls: ['./new-blog-detail.component.scss']
})
export class NewBlogDetailComponent implements OnInit {

  title: string = '';
  subTitle: string = '';
  faClock = faClock;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((v: any) => {
      this.title = v.title
      this.subTitle = v.subTitle
    });
  }

}
