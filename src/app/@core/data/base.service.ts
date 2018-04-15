import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HelperService } from '../utils/helper.service';

export abstract class BaseService {
  public domain: string;
  private http: Http;
  private helperService: HelperService;
  constructor(http: Http, helperService: HelperService, name: string) {
    this.http = http;
    this.helperService = helperService;
    this.domain = this.helperService.getApiDomain(name);
  }

  async getList(offset: number, limit: number, keyword: string, sort: string): Promise<any> {
    try {
      let headers = this.helperService.getHeadersRequest();
      if(keyword) { 
        keyword = keyword.trim();
      }
      let params = this.helperService.getParamsGetRequest(offset, limit, keyword, sort, []);
      let options = new RequestOptions({ headers: headers, search: params });

      const response = await this.http.get(this.domain, options)
        .toPromise();
      return response.json();
    } catch (error) {
      this.helperService.handleError(error);
    }
  }

  async add(model: any): Promise<any> {
    try {
      let headers = this.helperService.getHeadersRequest();
      let options = new RequestOptions({ headers: headers });

      const response = await this.http.post(this.domain, model, options)
        .toPromise();
      return response.json();
    } catch (error) {
      this.helperService.handleError(error);
    }
  }

  async edit(id: string, model: any): Promise<any> {
    try {
      let headers = this.helperService.getHeadersRequest();
      let options = new RequestOptions({ headers: headers });
      let url = this.domain + "/" + id;
      const response = await this.http.put(url, model, options)
        .toPromise();
      return response.json();
    } catch (error) {
      this.helperService.handleError(error);
    }
  }

  async delete(id: string): Promise<any> {
    try {
      let headers = this.helperService.getHeadersRequest();
      let options = new RequestOptions({ headers: headers });
      let url = this.domain + "/" + id;
      const response = await this.http.delete(url, options)
        .toPromise();
      return response.json();
    } catch (error) {
      this.helperService.handleError(error);
    }
  }
  async getAll(): Promise<any> {
    try {
      let headers = this.helperService.getHeadersRequest();
      let options = new RequestOptions({ headers: headers });

      const response = await this.http.get(this.domain + "/all", options)
        .toPromise();
      return response.json();
    } catch (error) {
      this.helperService.handleError(error);
    }
  }
}
