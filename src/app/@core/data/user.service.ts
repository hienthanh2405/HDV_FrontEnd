import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HelperService } from '../utils/helper.service';
import { BaseService } from './base.service';
@Injectable()
export class UserService extends BaseService {
  constructor(private childHttp: Http, private childHelperService: HelperService) {
    super(childHttp, childHelperService, "users");
  }
  async getCurrentUser(): Promise<any> {
    try {
      let headers = this.childHelperService.getHeadersRequest();
      let options = new RequestOptions({ headers: headers });
      let body = {};
      const response = await this.childHttp.get(`${this.domain}/self`, options)
        .toPromise();
      return response.json();
    } catch (error) {
      this.childHelperService.handleError(error);
    }
  }
  async changeStatus(userId: string, status: boolean): Promise<any> {
    try {
      let headers = this.childHelperService.getHeadersRequest();
      let options = new RequestOptions({ headers: headers });
      let body = {};
      const response = await this.childHttp.put(`${this.domain}/status/${userId}/${status}`, {}, options)
        .toPromise();
      return response.json();
    } catch (error) {
      this.childHelperService.handleError(error);
    }
  }
  async resetPassword(userId: string, model: ResetPasswordModel): Promise<any> {
    try {
      let headers = this.childHelperService.getHeadersRequest();
      let options = new RequestOptions({ headers: headers });
      let body = model;
      const response = await this.childHttp.put(`${this.domain}/password/${userId}`, body, options)
        .toPromise();
      return response.json();
    } catch (error) {
      this.childHelperService.handleError(error);
    }
  }
}

export class ResetPasswordModel {
  private password: string;

  constructor(password: string) {
    this.password = password;
  }

}
