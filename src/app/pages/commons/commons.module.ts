import { NgModule } from '@angular/core';
import {DeleteDialogComponent} from './delete-dialog/delete-dialog.component';
import {TranslateModule} from '@ngx-translate/core';
import { DialogComponent } from 'app/pages/commons/dialog/dialog.component';
import { CommonModule } from '@angular/common';  
import { ShowedColumnsButtonComponent } from 'app/pages/commons/showed-columns-button/showed-columns-button.component';
import { ThemeModule } from 'app/@theme/theme.module';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    ThemeModule
  ],
  declarations: [
    DeleteDialogComponent,
    DialogComponent,
    ShowedColumnsButtonComponent
  ],
  exports:[
    DialogComponent,
    DialogComponent,
    ShowedColumnsButtonComponent
  ]
})
export class CommonsModule { }
