import { Component, Input, OnInit } from '@angular/core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.scss']
})
export class NewBlogComponent implements OnInit {

  faCalendar = faCalendar;
  @Input() isIndex: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
