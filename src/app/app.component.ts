/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { TranslateService } from '@ngx-translate/core';
import { HelperService } from './@core/utils/helper.service';
import { CONSTANT } from './constant';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-app',
  providers: [TranslateService],
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService,
    private translate: TranslateService,
    private helperService: HelperService,
    private router: Router
  ) {
    translate.addLangs(["vi", "en"]);
    translate.setDefaultLang('vi');
    translate.use('vi');
  }
  allPages: any = [];

  async ngOnInit() {
    this.analytics.trackPageViews();
    this.processRedirect();
   
  }

  private processRedirect() {
    let accessToken = this.helperService.getLocalStorage(CONSTANT.ACCESS_TOKEN);
    let validTimeStamp = this.helperService.getLocalStorage(CONSTANT.VALID_TIMESTAMP);

    if ((validTimeStamp && validTimeStamp < + new Date()) || !accessToken) {
      this.router.navigateByUrl('auth');
    } else {
      let url = window.location.href;
      if (url.indexOf('pages') < 0) {
        this.router.navigateByUrl('pages');
      }
    }
  }
  
}
