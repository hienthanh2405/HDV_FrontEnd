import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HelperService } from '../utils/helper.service';
import {BaseService} from './base.service';
@Injectable()
export class RoleService extends BaseService {  
  constructor(private childHttp: Http, private childHelperService: HelperService) {
    super(childHttp,childHelperService, "roles");
  }
}
