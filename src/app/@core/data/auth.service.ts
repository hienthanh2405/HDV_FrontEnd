import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HelperService } from '../utils/helper.service';
import { CONSTANT } from 'app/constant';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  constructor(private http: Http, 
    private helperService: HelperService,
    private router: Router
  ) {
  }

  async login(username: string, password: string): Promise<any> {
    let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    body.set('grant_type', 'password');

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    
    let options = new RequestOptions({ headers: headers });
    try {
      const response = await this.http.post(this.helperService.getApiDomain('token'), 
      body.toString() , options).toPromise();
      return response.json();
    } catch(error) { 
      this.helperService.handleError(error);
    }
  }

  logout() {
    this.helperService.removeLocalStorage(CONSTANT.ACCESS_TOKEN);
    this.helperService.removeLocalStorage(CONSTANT.CURRENT_ROLE) ; 
    this.helperService.removeLocalStorage(CONSTANT.USER_PROFILE);
    this.helperService.removeLocalStorage(CONSTANT.VALID_TIMESTAMP);
    this.router.navigateByUrl("auth");
  }
}
