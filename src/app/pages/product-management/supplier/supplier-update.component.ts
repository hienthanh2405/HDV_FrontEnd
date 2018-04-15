import { Component, Input, Output, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from '../../../@core/utils/helper.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { NgbDatepickerConfig, NgbDateStruct, NgbDateParserFormatter, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from "../../commons/ng-bootstrap-datepicker-util/ngb-date-fr-parser-formatter";
import { CustomDatepickerI18n, I18n } from "../../commons/ng-bootstrap-datepicker-util/ngbd-datepicker-i18n";
import { SupplierService } from 'app/@core/data/supplier.service';
import { environment } from '../../../../environments/environment';
import { forEach } from '@angular/router/src/utils/collection';

export const CONSTANT = {
    API_DOMAIN: environment.apiDomain,
    ACCESS_TOKEN: 'access_token',
    VALID_TIMESTAMP: 'valid_timestamp',
    PAGE_SIZE: 10,
    USER_PROFILE: "user_profile",
    CURRENT_ROLE: "current_role",
    ACCESSIBLE_STORAGES: "accessible_storages",
    CURRENT_STORAGE: "current_storage",
    ROLES: {
        OWNER: "OWNER",
        MANAGER: "MANAGER",
        SALESMAN: "SALESMAN",
        WAREHOUSE: "WAREHOUSE"
    },
    EMAIL_PATTERN: "^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$",

    // Status for Product Storage filter
    PRODUCT_STORAGE_ALL: "ALL",
    PRODUCT_STORAGE_HAS_INVENTORY: "HAS_INVENTORY",
    PRODUCT_STORAGE_SOLD_OUT: "SOLD_OUT",

    // Status for InventoryEntity
    INVENTORY_INVENTORIED: "INVENTORIED",
    INVENTORY_BANLANCED: "BANLANCED",
    INVENTORY_DESTROY: "DESTROY",

}
@Component({
    selector: 'supplier-update-modal-component',
    templateUrl: './supplier-update.component.html',
    providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter },
        I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }
    ]
})

export class SupplierUpdateModalComponent implements OnInit {
    @Input() editedModel: any;
    @Input() reload: any;

    dataListCode = [];   // list code get to give up code is existed

    private today: any = this.helperService.getTodayForDatePicker();

    model: any = {
    };
    isEditMode = false;
    allDemos: any = [];
    isDuplicatedName : boolean = false;
    isDuplicatedPhone= false;
    isDuplicatedEmail = false;
    isDuplicatedCode: boolean = false;
    isDuplicatedAddress = false;

    // providersList: any = [];
    // productCategoryList: any = [];
    // selectedDate: any = this.today;
    // allStorages: any = [];
    // isSelectedStorages: any = [];
     isKeepOpen: boolean = false;

    constructor(public activeModal: NgbActiveModal,
        public helperService: HelperService,
        private toastrService: ToastrService,
        private supplierService : SupplierService,
        private translateService: TranslateService,
        private i18n: I18n,
        config: NgbDatepickerConfig,
    ) {
        // config maxDate and languge for date picker
        config.maxDate = this.today;
        this.i18n.language = this.translateService.currentLang;
    }

    async ngOnInit() {
        if (this.editedModel) {
            this.isEditMode = true;
            this.model = this.helperService.deepCopy(this.editedModel);
        }
        await this.getAllDemos();
// thêm vào
        await  this.getListCode_suppliers();

    }
//
    isDuplicatedForm() {
        return this.isDuplicatedName;
    }

    async getAllDemos() {
        const response = await this.supplierService.getAll();
        this.allDemos = response.data;
    }

    async onChangeNameValue(id, value) {
        this.isDuplicatedName = this.helperService.isDuplicatedValue(id, value, 'name', this.allDemos);
    }

    async getListCode_suppliers() {
      try {
        let response = await this.supplierService.getAll_CodeSupplier();
        console.log(response);
        this.dataListCode = response;
        console.log(this.dataListCode);
      } catch (error) {

      }
    }

    onChangeSupplierCode(code){
      console.log(code);
      for(let i = 0 ; i < this.dataListCode.length ; i ++){
        if (code === this.dataListCode[i]){
              this.isDuplicatedCode = true;
              console.log(this.isDuplicatedCode);
             return;
        }
      }
      this.isDuplicatedCode = false;
      console.log(this.isDuplicatedCode);
    }
    async onClickSaveBtn() {


        try {
            if (this.isEditMode) {
                let response = await this.supplierService.edit(this.model.id, this.model);
                this.helperService.showEditSuccessToast();
            } else {

                let response = await this.supplierService.add(this.model);
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
}
