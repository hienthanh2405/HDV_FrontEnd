import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import {TranslateModule} from '@ngx-translate/core';
import {CommonsModule} from '../commons/commons.module';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { PipeModule } from '../../pipes/pipe.module';
import { ProductUpdateModalComponent } from 'app/pages/product-management/product/product-update.component';
import { ProductCategoryUpdateModalComponent } from 'app/pages/product-management/productCategory/productCategory-update.component';
import { SupplierUpdateModalComponent } from 'app/pages/product-management/supplier/supplier-update.component'
import {TablesRoutingModule,routedComponents} from './product-management-routing.module';

const notRoutedComponents = [ 
 ProductUpdateModalComponent,
 ProductCategoryUpdateModalComponent,
 SupplierUpdateModalComponent
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
export class ProductManagementModule { }
