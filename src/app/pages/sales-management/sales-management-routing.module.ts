import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesManagmentComponent } from './sales-management.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {DeleteDialogComponent} from '../commons/delete-dialog/delete-dialog.component';
import {CarsComponent} from './cars/cars.component'; 
import {CarsUpdateModalComponent} from './cars/cars-update.component';

const routes: Routes = [{
  path: '',
  component: SalesManagmentComponent,
  children: [
 
    {
      path: 'cars',
      component: CarsComponent,
    },
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  entryComponents: [
     DeleteDialogComponent , 
  
  ]
})
export class TablesRoutingModule { }

export const routedComponents = [
  SalesManagmentComponent,

  CarsComponent,

];
