import { Component, Input, Output, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from '../../../@core/utils/helper.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { NgbDatepickerConfig, NgbDateStruct, NgbDateParserFormatter, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from "../../commons/ng-bootstrap-datepicker-util/ngb-date-fr-parser-formatter";
import { CustomDatepickerI18n, I18n } from "../../commons/ng-bootstrap-datepicker-util/ngbd-datepicker-i18n";
import { ProductService } from 'app/@core/data/product.service';
import { ProductCategoryService } from 'app/@core/data/productCategory.service';

@Component({
    selector: 'product-update-modal-component',
    templateUrl: './product-update.component.html',
    providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter },
        I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }
    ]
})

export class ProductUpdateModalComponent implements OnInit {
    @Input() editedModel: any;
    @Input() reload: any;

    private today: any = this.helperService.getTodayForDatePicker();

    model: any = {
    };
    isEditMode = false;
    allDemos: any = [];
    isDuplicatedName = false;
    providersList: any = [];
    productCategoryList: any = [];
    selectedDate: any = this.today;
    allStorages: any = [];
    isSelectedStorages: any = [];
    allProductCategories: any = [];
    isKeepOpen: boolean = false;
    dataListCode:any = [];
    isDuplicatedCode = false;

    constructor(public activeModal: NgbActiveModal,
        public helperService: HelperService,
        private toastrService: ToastrService,
        private productService : ProductService,
        private translateService: TranslateService,
        private productCategoryService: ProductCategoryService,
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
        await this.getallProductCategories();
        await this.getListCode_products();

    }
    async getListCode_products() {
      try {
        let response = await this.productService.getAll_Codeproducts();
        console.log(response);
        this.dataListCode = response;
        console.log(this.dataListCode);
      } catch (error) {

      }
    }
    onChangeProductCode(code){
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

    async getallProductCategories() {
        const response = await this.productCategoryService.getAll();
        this.allProductCategories = response.data;
    }

    isDuplicatedForm() {
        return this.isDuplicatedName;
    }

    async getAllDemos() {
        const response = await this.productService.getAll();
        this.allDemos = response.data;
    }

    async onChangeNameValue(id, value) {
        this.isDuplicatedName = this.helperService.isDuplicatedValue(id, value, 'name', this.allDemos);
    }

    async onClickSaveBtn() {
        try {
            if (this.isEditMode) {
                let response = await this.productService.edit(this.model.id, this.model);
                this.helperService.showEditSuccessToast();
            } else {
                let response = await this.productService.add(this.model);
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
