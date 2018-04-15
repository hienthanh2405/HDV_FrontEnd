import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { HelperService } from '../../../@core/utils/helper.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SupplierUpdateModalComponent } from './supplier-update.component';
import { DeleteDialogComponent } from '../../commons/delete-dialog/delete-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { CONSTANT } from 'app/constant';
import { AccessiblePageService } from 'app/@core/data/accessible-page.service';
import { SupplierService } from 'app/@core/data/supplier.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'my-demo',
  templateUrl: './supplier.component.html',
  styles: [`
  `],
})
export class SupplierComponent implements OnInit {

  dataList = [];
  page: number = 1;
  sort: string = 'name asc';
  totalSize: number = 0;
  keyword: string = '';
  //dataListCode = [];   // list code get to give up code is existed
  showedColumnList = [
    { name: 'name', translateKey: 'name', isShowed: true, sortable: true },
    { name: 'code', translateKey: 'code', isShowed: true, sortable: true },
    { name: 'phone', translateKey: 'phone', isShowed: true, sortable: true },
    { name: 'email', translateKey: 'email', isShowed: true, sortable: true },
    { name: 'address', translateKey: 'address', isShowed: true, sortable: true }
  ];

  constructor(
    private supplierService: SupplierService,
    public helperService: HelperService,
    private modalService: NgbModal,
    private translateService: TranslateService,
    private pagesService: AccessiblePageService
  ) {

  }
  async ngOnInit() {
    await this.getList();
    //await this.getListCode_suppliers();
  }
  async getList() {
    try {
      let response = await this.supplierService.getList(this.page - 1, CONSTANT.PAGE_SIZE, this.keyword, this.sort);

    //  console.log(response);
      // console.log(response);
      this.dataList = response;

      this.dataList = response.data;
      console.log(this.dataList);
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
    const modalRef = this.modalService.open(SupplierUpdateModalComponent, { backdrop: 'static' });
    modalRef.componentInstance.reload = () => {
      this.getList();

    };
  }
  onClickEditBtn(model: any): void {
    const modalRef = this.modalService.open(SupplierUpdateModalComponent, { backdrop: 'static' });
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
      return this.supplierService.delete(model.id);
    }
  }

  formatDate(jsonDate: string): string {
    return this.helperService.convertJSONDatetoDayMonthYear(jsonDate);
  }
}
