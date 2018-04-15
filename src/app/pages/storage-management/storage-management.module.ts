import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import {TranslateModule} from '@ngx-translate/core';
import {CommonsModule} from '../commons/commons.module';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { PipeModule } from '../../pipes/pipe.module';
import { StorageUpdateModalComponent } from 'app/pages/storage-management/storage/storage-update.component';
import { InventoryUpdateModalComponent } from 'app/pages/storage-management/inventory/inventory-update.component';

import {TablesRoutingModule,routedComponents} from './storage-management-routing.module';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

const notRoutedComponents = [ 
 StorageUpdateModalComponent,
 InventoryUpdateModalComponent,
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
    NgbActiveModal
  ],
})
export class StorageManagementModule { }
