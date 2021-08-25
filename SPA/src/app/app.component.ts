import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { freeSet } from '@coreui/icons';
declare var jQuery: any;

@Component({
  // tslint:disable-next-line
  selector: 'body',
  templateUrl: './app.component.html',
  providers: [IconSetService],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    public iconSet: IconSetService
  ) {
    // iconSet singleton
    iconSet.icons = { ...freeSet };
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    (function ($) {
      $(document).ready(function () {
        $.fn.select2.defaults.set("theme", "bootstrap4");
      });
    })(jQuery);
  }
}
