import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { HelperService } from '../../../@core/utils/helper.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerUpdateModalComponent } from './customer-update.component';
import { DeleteDialogComponent } from '../../commons/delete-dialog/delete-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { CustomerService } from 'app/@core/data/customer.service';
import { CONSTANT } from 'app/constant';
import { AccessiblePageService } from 'app/@core/data/accessible-page.service';

@Component({
  selector: 'my-demo',
  templateUrl: './customer.component.html',
  styles: [`
  `],
})
export class CustomerComponent implements OnInit {

  dataList = [];
  page: number = 1;
  sort: string = 'name asc';
  totalSize: number = 0;
  keyword: string = '';

  showedColumnList = [
    { name: 'name', translateKey: 'name_customer', isShowed: true, sortable: true },
    { name: 'companyName', translateKey: 'name_company', isShowed: false, sortable: true },
    { name: 'code',translateKey: 'code_customer', isShowed: true, sortable: true },
    { name: 'companyTaxCode', translateKey: 'code_company', isShowed: false, sortable: true },
    { name: 'address',translateKey: 'address_customer', isShowed: true, sortable: true },
    { name: 'companyAddress', translateKey: 'address_company', isShowed: false, sortable: true },
    { name: 'birthDate', translateKey: 'birthdate_customer', isShowed: true, sortable: true },
    { name: 'phoneNumber', translateKey: 'phonenumber_customer', isShowed: true, sortable: true },
    { name: 'companyPhone', translateKey: 'phonenumber_company', isShowed: false, sortable: true },
    { name: 'email', translateKey: 'email_customer', isShowed: true, sortable: true },
    { name: 'companyEmail', translateKey: 'email_company', isShowed: false, sortable: true },
    { name: 'shipContactName',translateKey: 'name_shipcontact', isShowed: true, sortable: true },
    { name: 'shipPhone', translateKey: 'phonenumber_shipcontact', isShowed: true, sortable: true },
    { name: 'shipAddress', translateKey: 'address_shipcontact', isShowed: true, sortable: true },

  ];

  constructor(
    private customerService: CustomerService,
    public helperService: HelperService,
    private modalService: NgbModal,
    private translateService: TranslateService,
    private pagesService: AccessiblePageService
  ) {

  }
  async ngOnInit() {
    await this.getList();
  }
  async getList() {
    try {
      let response = await this.customerService.getList(this.page - 1, CONSTANT.PAGE_SIZE, this.keyword, this.sort);
      this.dataList = response.data;
      this.totalSize = response.totalSize;
    } catch (error) {

    }
  }
  detectSortClassName(fieldName: string): string {
    return this.helperService.detectSortClassName(this.sort, fieldName);
  }

  onPageChange(event): void {
    this.page = event;
    this.getList();
  }
  onChangeSortedField(fieldName: string): void {
    this.sort = this.helperService.handleSortedFieldNameChanged(this.sort, fieldName);
    this.getList();
  }
  onClickSearchBtn(): void {
    this.getList();
  }
  onClickAddBtn(): void {
    const modalRef = this.modalService.open(CustomerUpdateModalComponent, { backdrop: 'static' });
    modalRef.componentInstance.reload = () => {
      this.getList();
    };
  }
  onClickEditBtn(model: any): void {
    const modalRef = this.modalService.open(CustomerUpdateModalComponent, { backdrop: 'static' });
    modalRef.componentInstance.reload = () => {
      this.getList();
    };
    modalRef.componentInstance.editedModel = model;
  }
  onClickDeleteBtn(model: any): void {
    const modalRef = this.modalService.open(DeleteDialogComponent, { backdrop: 'static' });
    modalRef.componentInstance.reload = () => {
      this.getList();
    };
    this.translateService.get("delete_demo").subscribe((res: string) => {
      modalRef.componentInstance.title = res;
    });
    modalRef.componentInstance.deleteFunction = () => {
      return this.customerService.delete(model.id);
    }
  }

  formatDate(jsonDate: string): string {
    return this.helperService.convertJSONDatetoDayMonthYear(jsonDate);
  }
}
