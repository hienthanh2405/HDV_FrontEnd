import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { HelperService } from '../../../@core/utils/helper.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteDialogComponent } from '../../commons/delete-dialog/delete-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { CreateWareHousingService } from 'app/@core/data/createwarehousing.service';
import { CONSTANT } from 'app/constant';
import { AccessiblePageService } from 'app/@core/data/accessible-page.service';
import { NgbDatepickerConfig, NgbDateStruct, NgbDateParserFormatter, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from '../../../@core/data/storage.service';
import { SupplierService } from '../../../@core/data/supplier.service';


@Component({
  selector: 'my-demo',
  templateUrl: './createWarehousing.component.html',
  styles: [`
  `],
  
})
export class CreateWarehousingComponent implements OnInit {

  @Input() editedModel: any;
  @Input() reload: any;

  dataList = [];
  page: number = 1;
  sort: string = 'name asc';
  totalSize: number = 0;
  keyword: string = '';
  isKeepOpen: boolean = false;
  model: any = {};
  allDemos: any = [];
  isEditMode = false;
  allStorages: any = [];
  allSuppliers: any = [];

  showedColumnList = [
    // { name: 'code', translateKey: 'codeWarehousing', isShowed: true, sortable: true },
    // { name: 'createdDate', translateKey: 'CreatedDate_Warehousing', isShowed: true, sortable: true },
   
    { name: 'code', translateKey: 'code_product', isShowed: true, sortable: true },
    { name: 'productName', translateKey: 'ProductName_Warehousing', isShowed: true, sortable: true },
    { name: 'amount', translateKey: 'Amount_Warehousing', isShowed: true, sortable: true },
    { name: 'capitalPrice', translateKey: 'Capital_Warehousing', isShowed: true, sortable: true },
    { name: 'totalPrice', translateKey: 'TotalPrice_Warehousing', isShowed: true, sortable: true },
    
    // { name: 'totalMoney', translateKey: 'TotalMoney_Warehousing', isShowed: true, sortable: true },
    // { name: 'payMoney', translateKey: 'PayMoney_Warehousing', isShowed: true, sortable: true },
    // { name: 'debtMoney', translateKey: 'DebtMoney_Warehousing', isShowed: true, sortable: true },
    // { name: 'nameUser', translateKey: 'NameUser_Warehousing', isShowed: true, sortable: true },
    // { name: 'storage', translateKey: 'name_storage', isShowed: true, sortable: true },
    // { name: 'nameSupplier', translateKey: 'NameSupplier_Warehousing', isShowed: false, sortable: true },
    
  ];

  constructor(
    public activeModal: NgbActiveModal,
    private createwarehousingService: CreateWareHousingService,
    public helperService: HelperService,
    private modalService: NgbModal,
    private translateService: TranslateService,
    private pagesService: AccessiblePageService,
    private storageService: StorageService,
    private supplierService: SupplierService
  ) {

  }
  async ngOnInit() {
    await this.getList();
  }
  async getList() {
    try {
      let response = await this.createwarehousingService.getList(this.page - 1, CONSTANT.PAGE_SIZE, this.keyword, this.sort);
      this.dataList = response.data;
      this.totalSize = response.totalSize;
    } catch (error) {

    }
  }

  async getallStorages() {
    const response = await this.storageService.getAll();
    this.allStorages = response.data;
}

  async getallSuppliers() {
    const response = await this.supplierService.getAll();
    this.allSuppliers = response.data;
}


  detectSortClassName(fieldName: string): string {
    return this.helperService.detectSortClassName(this.sort, fieldName);
  }

  async getAllDemos() {
    const response = await this.createwarehousingService.getAll();
    this.allDemos = response.data;
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
  //   const modalRef = this.modalService.open(WarehousingUpdateModalComponent, { backdrop: 'static' });
  //   modalRef.componentInstance.reload = () => {
  //     this.getList();
  //   };
  // }
  // onClickEditBtn(model: any): void {
  //   const modalRef = this.modalService.open(WarehousingUpdateModalComponent, { backdrop: 'static' });
  //   modalRef.componentInstance.reload = () => {
  //     this.getList();
  //   };
  //   modalRef.componentInstance.editedModel = model;
  // }

  onClickDeleteBtn(model: any): void {
    const modalRef = this.modalService.open(DeleteDialogComponent, { backdrop: 'static' });
    modalRef.componentInstance.reload = () => {
      this.getList();
    };
    this.translateService.get("delete_demo").subscribe((res: string) => {
      modalRef.componentInstance.title = res;
    });
    modalRef.componentInstance.deleteFunction = () => {
      return this.createwarehousingService.delete(model.id);
    }
  }

  async onClickSaveBtn() {
    try {
        if (this.isEditMode) {
            let response = await this.createwarehousingService.edit(this.model.id, this.model);
            this.helperService.showEditSuccessToast();
        } else {
            let response = await this.createwarehousingService.add(this.model);
            this.helperService.showAddSuccessToast();
            if (this.isKeepOpen) {
                this.getAllDemos();
                this.model.name = null;
            }
        }
        if (!this.isKeepOpen) {
            this.activeModal.close();
            this.reload();
        }
    } catch (error) {
        this.helperService.showErrorToast(error);
    }
}

  formatDate(jsonDate: string): string {
    return this.helperService.convertJSONDatetoDayMonthYear(jsonDate);
  }
}
