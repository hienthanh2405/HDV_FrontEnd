import { Component, Input, Output, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from '../../../@core/utils/helper.service';

@Component({
    selector: 'delete-dialog-component',
    templateUrl: './delete-dialog.component.html',
})
export class DeleteDialogComponent implements OnInit {
    @Input() title: string;
    @Input() reload: any;
    @Input() deleteFunction: any;
    @Input() deleteMessage: string;
    @Input() toastFunction: any;
    @Input() buttonText : string;

    isExistTextButton: boolean = false;

    constructor(public activeModal: NgbActiveModal,
        private helperService: HelperService
    ) { }

    ngOnInit() {
        if(this.buttonText) {
            this.isExistTextButton = true;
        } else{
            this.isExistTextButton = false;
        }
    }
    
    async onClickDeleteBtn() {
        try {
            let response = await this.deleteFunction(); 
            if(this.toastFunction) { 
                this.toastFunction();
            } else{
                this.helperService.showDeleteSuccessToast();
            }
            this.activeModal.close();
            this.reload();

        } catch (error) {
            this.helperService.showErrorToast(error);
        }
    }
}
