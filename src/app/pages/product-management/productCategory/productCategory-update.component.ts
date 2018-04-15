import { Component, Input, Output, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from '../../../@core/utils/helper.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { NgbDatepickerConfig, NgbDateStruct, NgbDateParserFormatter, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from "../../commons/ng-bootstrap-datepicker-util/ngb-date-fr-parser-formatter";
import { CustomDatepickerI18n, I18n } from "../../commons/ng-bootstrap-datepicker-util/ngbd-datepicker-i18n";
import { ProductCategoryService } from 'app/@core/data/productCategory.service';

@Component({
    selector: 'productCategory-update-modal-component',
    templateUrl: './productCategory-update.component.html',
    providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter },
        I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }
    ]
})

export class ProductCategoryUpdateModalComponent implements OnInit {
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
    isKeepOpen: boolean = false;

    constructor(public activeModal: NgbActiveModal,
        public helperService: HelperService,
        private toastrService: ToastrService,
        private productCategoryService : ProductCategoryService,
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
    }

    isDuplicatedForm() {
        return this.isDuplicatedName;
    }

    async getAllDemos() {
        const response = await this.productCategoryService.getAll();
        this.allDemos = response.data;
    }
  
    async onChangeNameValue(id, value) {
        this.isDuplicatedName = this.helperService.isDuplicatedValue(id, value, 'name', this.allDemos);
    }

    async onClickSaveBtn() {
        // let inputStorageIdList = [];
        // for (let i = 0; i < this.isSelectedStorages.length; i++) {
        //     if (this.isSelectedStorages[i]) {
        //         inputStorageIdList.push(this.allStorages[i].id);
        //     }
        // }
        // this.model.updatePriceDate = this.helperService.convertNgDatePickerToJSONFormat(this.selectedDate);
        // this.model.inputStorageIdList = inputStorageIdList;
        try {
            if (this.isEditMode) {
                let response = await this.productCategoryService.edit(this.model.id, this.model);
                this.helperService.showEditSuccessToast();
            } else {
                let response = await this.productCategoryService.add(this.model);
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
