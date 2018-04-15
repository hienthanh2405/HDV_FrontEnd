import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { CONSTANT } from '../../../constant';
import { HelperService } from '../../../@core/utils/helper.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CarsUpdateModalComponent } from './cars-update.component';
import { DeleteDialogComponent } from '../../commons/delete-dialog/delete-dialog.component';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'my-cars',
  templateUrl: './cars.component.html',
  styles: [`
  `],
})
export class CarsComponent implements OnInit {
 

  dataList = [];
  page: number = 1;
  sort: string = 'carNumber asc';
  totalSize: number = 0;
  keyword: string = '';

  constructor(
   
    public helperService: HelperService,
    private modalService: NgbModal,
    private translateService: TranslateService,
   
  ) {
    this.getList();
  }
  async ngOnInit() {
    
  }

  async getList() {

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
    const modalRef = this.modalService.open(CarsUpdateModalComponent, { backdrop: 'static' });
    modalRef.componentInstance.reload = () => {
      this.getList();
    };
  }
  onClickEditBtn(model: any): void {
    const modalRef = this.modalService.open(CarsUpdateModalComponent, { backdrop: 'static' });
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
    
    this.translateService.get('delete_car').subscribe((res: string) => {
      modalRef.componentInstance.title = res;
    })

    modalRef.componentInstance.deleteFunction = () => {
     
    }
  }
}
