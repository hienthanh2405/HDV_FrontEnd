import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HelperService } from '../utils/helper.service';
import { BaseService } from './base.service';
import { CONSTANT } from '../../constant';

@Injectable()
export class AccessiblePageService extends BaseService {
  constructor(private childHttp: Http, private childHelperService: HelperService,
    private router: Router
  ) {
    super(childHttp, childHelperService, "accessiblePages");
  }

  async getRoleNamesByPageName(pageName: string): Promise<any> {
    try {
      let headers = this.childHelperService.getHeadersRequest();
      let options = new RequestOptions({ headers: headers });
      let body = {};
      const response = await this.childHttp.get(`${this.domain}/roleNames/${pageName}`, options)
        .toPromise();
      return response.json();
    } catch (error) {
      this.childHelperService.handleError(error);
    }
  }

  async isAccessableRole(pageName: string) {
    let response = await this.getRoleNamesByPageName(pageName);
    let roleNames = JSON.parse(response.data);
    let mainRole = roleNames[0];
    let currentRole = this.childHelperService.getLocalStorage(CONSTANT.CURRENT_ROLE);
    return (currentRole === mainRole);
  }
  async checkAccessableRole(pageName: string) {
    let response = await this.getRoleNamesByPageName(pageName);
    let roleNames = JSON.parse(response.data);
    let mainRole = roleNames[0];
    let currentRole = this.childHelperService.getLocalStorage(CONSTANT.CURRENT_ROLE);
    if (roleNames.indexOf(currentRole) < 0) {
      this.router.navigateByUrl('pages/permission-deny');
    }
  }
}
