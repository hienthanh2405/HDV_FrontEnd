import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import {TranslateModule} from '@ngx-translate/core';
import {CommonsModule} from '../commons/commons.module';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { PipeModule } from '../../pipes/pipe.module';
import { DemoUpdateModalComponent } from 'app/pages/demo-management/demo/demo-update.component';
import {TablesRoutingModule,routedComponents} from './demo-management-routing.module';

const notRoutedComponents = [ 
 DemoUpdateModalComponent,
]

@NgModule({
  imports: [
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    TranslateModule,
    CommonsModule,
    CurrencyMaskModule,
    PipeModule
    
  ],
  declarations: [
    ...routedComponents,
    ...notRoutedComponents
  ],
  providers: [
  ],
})
export class DemoManagementModule { }
