import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { DeleteDialogComponent } from '../commons/delete-dialog/delete-dialog.component';
import { DemoManagementComponent } from './demo-management.component';
import { DemoComponent } from './demo/demo.component';
import { DemoUpdateModalComponent } from './demo/demo-update.component';
import { ShowedColumnsButtonComponent } from 'app/pages/commons/showed-columns-button/showed-columns-button.component';

const routes: Routes = [{
  path: '',
  component: DemoManagementComponent,
  children: [{
    path: 'demo',
    component: DemoComponent,
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  entryComponents: [DemoUpdateModalComponent,
    DeleteDialogComponent,
    ShowedColumnsButtonComponent
  ]
})
export class TablesRoutingModule { }

export const routedComponents = [
  DemoManagementComponent,
  DemoComponent
];
