import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { DeleteDialogComponent } from '../commons/delete-dialog/delete-dialog.component';
import { StorageManagementComponent } from './storage-management.component';
import { StorageComponent } from './storage/storage.component';
import { StorageUpdateModalComponent } from './storage/storage-update.component';
import { ShowedColumnsButtonComponent } from 'app/pages/commons/showed-columns-button/showed-columns-button.component';

import { InventoryComponent } from './inventory/inventory.component';
import { InventoryUpdateModalComponent } from './inventory/inventory-update.component';

import { WarehousingComponent } from './warehousing/warehousing.component';

import { CreateWarehousingComponent } from './warehousing/createWarehousing.component';

const routes: Routes = [{
  path: '',
  component: StorageManagementComponent,
  children: [{
    path: 'storages',
    component: StorageComponent,
  },
  {
    path: 'inventories',
    component: InventoryComponent,
  },
  {
    path: 'warehousings',
    component: WarehousingComponent,
  },
  {
    path: 'warehousings-create',
    component: CreateWarehousingComponent,
  },
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  entryComponents: [StorageUpdateModalComponent,
    InventoryUpdateModalComponent,
    DeleteDialogComponent,
    ShowedColumnsButtonComponent
  ]
})
export class TablesRoutingModule { }

export const routedComponents = [
  StorageManagementComponent,
  StorageComponent ,
  InventoryComponent,
  WarehousingComponent,
  CreateWarehousingComponent,
];
