import { Injectable, Inject, forwardRef } from '@angular/core';
import { Http, URLSearchParams, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { CONSTANT } from '../../constant';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Injectable()
export class HelperService {
  constructor(private http: Http,
    private router: Router,
    private toastrService: ToastrService,
    private translateService: TranslateService,
  ) {
  }
  getApiDomain(name: string) {
    return CONSTANT.API_DOMAIN + name;
  }
  handleError(error) {
    if (error.status === 401) {
      this.router.navigateByUrl('auth');
    }
    throw error.json();
  }
  getHeadersRequest() {
    let headers = new Headers();
    let accessToken = this.getLocalStorage(CONSTANT.ACCESS_TOKEN);
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + accessToken);
    return headers;
  }
  getParamsGetRequest(offset, limit, keyword, sort, filter: any) {
    let params = new URLSearchParams();
    params.set('offset', offset);
    params.set('limit', limit);
    params.set('sort', sort);
    params.set('keyword', keyword)
    for (let i = 0; i < filter.length; i++) {
      params.append('filter', filter[i]);
    }
    return params;
  }
  setLocalStorage(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  getLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
  removeLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  detectSortClassName(sort: string, currentFieldName: string) {
    let array = sort.split(' ');
    let fieldName = array[0];
    let sortType = array[1];
    if (currentFieldName === fieldName) {
      return 'sort ' + sortType; // return 'sort desc' or 'sort asc'
    } else {
      return 'sort both';
    }
  }
  handleSortedFieldNameChanged(sort: string, choosedFieldName: string) {
    let array = sort.split(' ');
    let fieldName = array[0];
    let sortType = array[1];
    if (choosedFieldName === fieldName) {
      return choosedFieldName + (sortType === 'desc' ? ' asc' : ' desc');
    } else {
      return choosedFieldName + ' ' + sortType;
    }
  }
  showAddSuccessToast(): void {
    let title = '';
    let message = '';
    this.translateService.get('success').subscribe((res: string) => {
      title = res;
    })
    this.translateService.get('add_success').subscribe((res: string) => {
      message = res;
    })
    this.toastrService.success(message, title);
  }
  showEditSuccessToast(keyword: string = null): void {
    let title = '';
    let message = '';
    this.translateService.get('success').subscribe((res: string) => {
      title = res;
    })
    if (keyword == null) {
      this.translateService.get('edit_success').subscribe((res: string) => {
        message = res;
      })
    }
    else {
      this.translateService.get(keyword).subscribe((res: string) => {
        message = res;
      })
    }
    this.toastrService.success(message, title);
  }

  showDeleteSuccessToast(): void {
    let title = '';
    let message = '';
    this.translateService.get('success').subscribe((res: string) => {
      title = res;
    })
    this.translateService.get('delete_success').subscribe((res: string) => {
      message = res;
    })
    this.toastrService.success(message, title);
  }

  showErrorToast(error: any): void {
    let title = '';
    this.translateService.get('error').subscribe((res: string) => {
      title = res;
    })
    let message = (error.message) ? error.message : '';
    //  Check that if Backend return with {message , detail}, we create a message with detail information.
    message = (error.detail) ? message + " " + error.detail : message;
    // Backend return Bad Request with {error, error_description}, we a message with error_description information.
    message = (error.error_description) ? message + " " + error.error_description : message;
    // Bad Request returns DbUpdateException message.
    // It occurs when confilting foreign key contract. Backend returns {message, translateKey }
    if (error.message === "DbUpdateException") {
      this.translateService.get(error.translateKey).subscribe((res: string) => {
        message = res;
      })
    }
    // If Bad Request returns translateKey, use this translateKey
    if (error.message !== null && error.translateKey !== null) {
      this.translateService.get(error.translateKey).subscribe((res: string) => {
        message = res;
      })
    }
    this.toastrService.error(message, title);
  }

  showErrorLoadingToarst() {
    let title = '';
    let message = '';
    this.translateService.get('error').subscribe((res: string) => {
      title = res;
    })
    this.translateService.get('data_loading_error').subscribe((res: string) => {
      message = res;
    })
    this.toastrService.error(message, title);
  }

  deepCopy(target: any): any {
    return JSON.parse(JSON.stringify(target));
  }
  toLowercase(content: string) {
    return content.toLowerCase();
  }

  isDuplicatedValue(id: string, value: any, key: string, dataList: any) {
    for (let i = 0; i < dataList.length; i++) {
      if (dataList[i][key] === value && dataList[i]['id'] !== id) {
        return true;
      }
    }
    return false;
  }
  isExistOnList(id: string, dataList: any): boolean {
    for (let i = 0; i < dataList.length; i++) {
      if (dataList[i].id === id) {
        return true;
      }
    }
    return false;
  }

  findIndex(id: string, dataList: any): number {
    for (let i = 0; i < dataList.length; i++) {
      if (dataList[i].id === id) {
        return i;
      }
    }
    return -1;
  }

  findObjectInList(key: string, value: any, dataList: any) {
    for (let i = 0; i < dataList.length; i++) {
      if (dataList[i][key] == value) {
        return dataList[i];
      }
    }
    return null;
  }

  getTodayForDatePicker(): any {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
  }

  getMinDateForDatePicker(): any {
    const now = new Date();
    return { year: 1900, month: 1, day: 1 };
  }

  convertNgDatePickerToJSONFormat(ngDatePickerDate: any): string {
    return `${ngDatePickerDate.year}-${ngDatePickerDate.month}-${ngDatePickerDate.day}`;
  }
  convertJSONDatetoDayMonthYear(jsonDate: string): string {
    let returnDate = moment(jsonDate).format("DD/MM/YYYY");
    if (returnDate === 'Invalid date') {
      return null;
    } else {
      return returnDate;
    }
  }
  getToday(): any {
    const now = new Date();
    let returnDate = moment(now).format("DD/MM/YYYY");
    return returnDate;
  }

  convertJSONDatetoDayMonthYearHourMinute(jsonDate: string): string {
    let returnDate = moment(jsonDate).format("DD/MM/YYYY hh:mm");
    if (returnDate === 'Invalid date') {
      return null;
    } else {
      return returnDate;
    }
  }

  convertJSONDateToDatePickerFormat(jsonDate: string) {
    let returnDate = moment(jsonDate).toDate();
    return { year: returnDate.getFullYear(), month: returnDate.getMonth() + 1, day: returnDate.getDate() };;
  }

  isNaNOrEmptyInput(input) {
    return ((input && input.errors && input.errors.required || isNaN(input.value)) && input.touched);
  }
  isEmptyInput(input) {
    return ((input && input.errors && input.errors.required) && input.touched);
  }
  isLessThanMinLength(input) {
    return ((input && input.errors && input.errors.minlength) && input.touched);
  }
  isWrongEmailPartern(input) {
    return ((input && input.errors && input.errors.partern) && input.touched);
  }

  convertJSONToObject(json) {
    return JSON.parse(json);
  }
  roundOneDecimal(number) {
    return Math.round(number * 10) / 10;
  }
  getEmailPartern() {
    return CONSTANT.EMAIL_PARTERN;
  }
  randomPassword() {
    return Math.random().toString(36).slice(-8);
  }
  isWrongInputPattern(input) {
    return ((input && input.errors && input.errors.pattern) && input.touched);
  }
  // isExistCode_supplier(input){
  //   return
  // }


  isShowedColumn(columnName: string, showedColumnList: any) {
    for (let i = 0; i < showedColumnList.length; i++) {
      if (showedColumnList[i]['name'] == columnName) {
        return showedColumnList[i].isShowed;
      }
    }
    return false;
  }
  getSortableCssClass(sort: string, currentFieldName: string, isSortable: boolean) {
    if (isSortable) {
      let array = sort.split(' ');
      let fieldName = array[0];
      let sortType = array[1];
      if (currentFieldName === fieldName) {
        return 'sortable sort ' + sortType; // return 'sort desc' or 'sort asc'
      } else {
        return 'sortable sort both';
      }
    } else {
      return '';
    }
  }
}

