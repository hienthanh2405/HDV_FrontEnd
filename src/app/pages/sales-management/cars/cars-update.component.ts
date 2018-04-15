import { Component, Input, Output, OnInit , ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { HelperService } from '../../../@core/utils/helper.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { NgbDateFRParserFormatter } from "../../commons/ng-bootstrap-datepicker-util/ngb-date-fr-parser-formatter";
import { NgbDatepickerConfig, NgbDateStruct, NgbDateParserFormatter, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { CustomDatepickerI18n, I18n } from "../../commons/ng-bootstrap-datepicker-util/ngbd-datepicker-i18n";

import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'cars-update-modal-component',
    styles: [`
    `],
    templateUrl: './cars-update.component.html',
    providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter },
        I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }
    ]
})
export class CarsUpdateModalComponent implements OnInit {
    @Input() editedModel: any;
    @Input() reload: any;
    
    @ViewChild('p') public popover: NgbPopover;

    private today: any = this.helperService.getTodayForDatePicker();
    private hasChangedDriver: boolean = false;
    model: any = {
        currentKm: 0
    };
    isEditMode = false;
    selectedDate: any = this.helperService.getTodayForDatePicker();
    allCarTypes: any = [];
    selectedDriver: any;
    allDrivers: any = [];
    isInvalidDriver: boolean = false;
    driverPopover : NgbPopover;

    constructor(public activeModal: NgbActiveModal,
       
        public helperService: HelperService,
        private toastrService: ToastrService,
        private translateService: TranslateService,
     
        config: NgbDatepickerConfig,
        private i18n: I18n,
        private sanitizer: DomSanitizer
    ) {
        config.maxDate = this.today;
        this.i18n.language = this.translateService.currentLang;
    }

    async ngOnInit() {
        this.driverPopover = this.popover;
        this.getAllCarTypes();
        await this.getAllDrivers();

        if (this.editedModel) {
            this.isEditMode = true;
            this.model = this.helperService.deepCopy(this.editedModel);
             let driver = this.model.driver;
             for(let i = 0 ; i < this.allDrivers.length; i++){
                 if(this.allDrivers[i].id === driver.id) {
                    this.selectedDriver = this.allDrivers[i];
                 }
             }
            this.selectedDate = this.helperService.convertJSONDateToDatePickerFormat(this.model.updateKmDate);
        }
    }

    async getAllCarTypes() {
       
    }
    async getAllDrivers() {
       
     
    }
    isValidDriver() { 
        return (this.selectedDriver && this.selectedDriver.hasOwnProperty('id'));
    }
    async onClickSaveBtn() {
        let requestModel = {
            carNumber: this.model.carNumber,
            carModel: this.model.carModel,
            currentKm: this.model.currentKm,
            updateKmDate: this.model.updateKmDate,
            carTypeId: this.model.carTypeId,
            note: this.model.note,
            driverId: this.model.driverId

        };
        if (this.selectedDriver.hasOwnProperty('id')) {
            requestModel.driverId = this.selectedDriver.id;
        }
        if (this.selectedDate) {
            requestModel.updateKmDate = this.helperService.convertNgDatePickerToJSONFormat(this.selectedDate);
        }

        try {
            if (this.isEditMode) {
                if (!this.hasChangedDriver) {
                    requestModel.driverId = this.model.driverId
                }

                this.helperService.showEditSuccessToast();
            } else {
              
                this.helperService.showAddSuccessToast();
            }
            this.activeModal.close();


        } catch (error) {
            this.helperService.showErrorToast(error);
        }
    }
    onChangeDriver(data) {
        this.hasChangedDriver = true;
    }

    autocompleListFormatter = (data: any): SafeHtml => {
        let html = `<span>${data.firstName} ${data.lastName} ( ${data.phone} )</span>`;
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }
    async handleDriverCreated(driverId) { 
        await this.getAllDrivers();
        for(let i = 0 ; i < this.allDrivers.length ; i++) {
            if(this.allDrivers[i].id == driverId){
                this.selectedDriver = this.allDrivers[i];
            }
        }
    }
  
    onClickCreateDriverBtn(){
        if(this.popover.isOpen()){
            this.popover.close();
        }else{
            this.popover.open();
        }
    }

}
