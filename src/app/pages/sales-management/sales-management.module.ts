import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './sales-management-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {CommonsModule} from '../commons/commons.module';

import { CurrencyMaskModule } from "ng2-currency-mask";
import { PipeModule } from '../../pipes/pipe.module';

import {CarsUpdateModalComponent} from './cars/cars-update.component';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';


const notRoutedComponents = [ 
  CarsUpdateModalComponent,

]

@NgModule({
  imports: [
    ThemeModule,
    TablesRoutingModule,
    TranslateModule,
    CommonsModule,
    CurrencyMaskModule,
    PipeModule,
    NguiAutoCompleteModule
    
  ],
  declarations: [
    ...routedComponents,
    ...notRoutedComponents
  ],
  providers: [
  ],
})
export class SalesManagementModule { }
