import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { HelperService } from '../../../@core/utils/helper.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteDialogComponent } from '../../commons/delete-dialog/delete-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { DemoService } from 'app/@core/data/demo.service';
import { CONSTANT } from 'app/constant';
import { AccessiblePageService } from 'app/@core/data/accessible-page.service';

@Component({
  selector: 'my-demo',
  templateUrl: './inventory.component.html',
  styles: [`
  `],
})
export class InventoryComponent implements OnInit {

  dataList = [];
  page: number = 1;
  sort: string = 'name asc';
  totalSize: number = 0;
  keyword: string = '';

  showedColumnList = [
    { name: 'name', translateKey: 'name_product', isShowed: true, sortable: true },
    { name: 'nameStorage', translateKey: 'name_storage', isShowed: true, sortable: true },
    { name: 'amount', translateKey: 'amount_inventory', isShowed: true, sortable: true },
  ];

  constructor(
    private demoService: DemoService,
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
      let response = await this.demoService.getList(this.page - 1, CONSTANT.PAGE_SIZE, this.keyword, this.sort);
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
  // onClickAddBtn(): void {
  //   const modalRef = this.modalService.open(StorageUpdateModalComponent, { backdrop: 'static' });
  //   modalRef.componentInstance.reload = () => {
  //     this.getList();
  //   };
  // }
  // onClickEditBtn(model: any): void {
  //   const modalRef = this.modalService.open(StorageUpdateModalComponent, { backdrop: 'static' });
  //   modalRef.componentInstance.reload = () => {
  //     this.getList();
  //   };
  //   modalRef.componentInstance.editedModel = model;
  // }
  // onClickDeleteBtn(model: any): void {
  //   const modalRef = this.modalService.open(DeleteDialogComponent, { backdrop: 'static' });
  //   modalRef.componentInstance.reload = () => {
  //     this.getList();
  //   };
  //   this.translateService.get("delete_demo").subscribe((res: string) => {
  //     modalRef.componentInstance.title = res;
  //   });
  //   modalRef.componentInstance.deleteFunction = () => {
  //     return this.demoService.delete(model.id);
  //   }
  // }

  formatDate(jsonDate: string): string {
    return this.helperService.convertJSONDatetoDayMonthYear(jsonDate);
  }
}
