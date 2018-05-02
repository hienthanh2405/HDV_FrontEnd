import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PermissionDenyComponent } from './permission-deny/permission-deny.component';
import { DemoComponent } from 'app/pages/demo-management/demo/demo.component';

import { StorageComponent } from 'app/pages/storage-management/storage/storage.component';
import { CustomerComponent } from 'app/pages/customer-management/customer/customer.component';
import { InventoryComponent } from 'app/pages/storage-management/inventory/inventory.component';
import { ProductComponent } from 'app/pages/product-management/product/product.component';
import { ProductCategoryComponent } from 'app/pages/product-management/productCategory/productCategory.component';
import { SupplierComponent } from 'app/pages/product-management/supplier/supplier.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'permission-deny',
    component: PermissionDenyComponent,
  },
  {
    path: 'demo-management',
    loadChildren: './demo-management/demo-management.module#DemoManagementModule'
  },
  {
    path: 'storage-management',
    loadChildren: './storage-management/storage-management.module#StorageManagementModule'
  },
  {
    path: 'product-management',
    loadChildren: './product-management/product-management.module#ProductManagementModule'
  },
  {
    path: 'sales',
    loadChildren: './sales-management/sales-management.module#SalesManagementModule',
  },
  {
    path: 'customer-management',
    loadChildren: './customer-management/customer-management.module#CustomerManagementModule'
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
