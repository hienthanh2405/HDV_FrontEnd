import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { HelperService } from '../../../@core/utils/helper.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router'
// import { WarehousingUpdateModalComponent } from './warehousing-update.component';
import { DeleteDialogComponent } from '../../commons/delete-dialog/delete-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { WarehousingService } from 'app/@core/data/warehousing.service';
import { CONSTANT } from 'app/constant';
import { AccessiblePageService } from 'app/@core/data/accessible-page.service';
import { CreateWarehousingComponent } from './createWarehousing.component';

@Component({
  selector: 'my-demo',
  templateUrl: './warehousing.component.html',
  styles: [`
  `],
})
export class WarehousingComponent implements OnInit {

  dataList = [];
  page: number = 1;
  sort: string = 'name asc';
  totalSize: number = 0;
  keyword: string = '';

  showedColumnList = [
    { name: 'code', translateKey: 'codeWarehousing', isShowed: true, sortable: true },
    { name: 'createdDate', translateKey: 'CreatedDate_Warehousing', isShowed: true, sortable: true },
   
    // { name: 'code', translateKey: 'code_product', isShowed: true, sortable: true },
    // { name: 'productName', translateKey: 'ProductName_Warehousing', isShowed: true, sortable: true },
    // { name: 'amount', translateKey: 'Amount_Warehousing', isShowed: true, sortable: true },
    // { name: 'capitalPrice', translateKey: 'Capital_Warehousing', isShowed: true, sortable: true },
    // { name: 'totalPrice', translateKey: 'TotalPrice_Warehousing', isShowed: true, sortable: true },
    
    { name: 'totalMoney', translateKey: 'TotalMoney_Warehousing', isShowed: true, sortable: true },
    { name: 'payMoney', translateKey: 'PayMoney_Warehousing', isShowed: true, sortable: true },
    { name: 'debtMoney', translateKey: 'DebtMoney_Warehousing', isShowed: true, sortable: true },
    { name: 'nameUser', translateKey: 'NameUser_Warehousing', isShowed: true, sortable: true },
    { name: 'storage', translateKey: 'name_storage', isShowed: true, sortable: true },
    { name: 'nameSupplier', translateKey: 'NameSupplier_Warehousing', isShowed: false, sortable: true },
    
  ];

  constructor(
    private warehousingService: WarehousingService,
    public helperService: HelperService,
    private modalService: NgbModal,
    private translateService: TranslateService,
    private pagesService: AccessiblePageService,
    private router: Router,
  ) {

  }
  async ngOnInit() {
    await this.getList();
  }
  async getList() {
    try {
      let response = await this.warehousingService.getList(this.page - 1, CONSTANT.PAGE_SIZE, this.keyword, this.sort);
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
    this.router.navigateByUrl("/pages/storage-management/warehousings-create");



  }
  onClickEditBtn(model: any): void {
    const modalRef = this.modalService.open(CreateWarehousingComponent, { backdrop: 'static' });
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
      return this.warehousingService.delete(model.id);
    }
  }

  formatDate(jsonDate: string): string {
    return this.helperService.convertJSONDatetoDayMonthYear(jsonDate);
  }
}
