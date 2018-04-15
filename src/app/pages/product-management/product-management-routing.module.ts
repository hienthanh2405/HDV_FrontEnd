import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { DeleteDialogComponent } from '../commons/delete-dialog/delete-dialog.component';
import { ProductManagementComponent } from './product-management.component';
import { ProductComponent } from './product/product.component';
import { ProductUpdateModalComponent } from './product/product-update.component';
import { ShowedColumnsButtonComponent } from 'app/pages/commons/showed-columns-button/showed-columns-button.component';

import { ProductCategoryComponent } from './productCategory/productCategory.component';
import { ProductCategoryUpdateModalComponent } from 'app/pages/product-management/productCategory/productCategory-update.component';

import { SupplierComponent } from './supplier/supplier.component';
import { SupplierUpdateModalComponent } from 'app/pages/product-management/supplier/supplier-update.component';

const routes: Routes = [{
  path: '',
  component: ProductManagementComponent,
  children: [{
    path: 'products',
    component: ProductComponent,
  },
  {
    path: 'productCategories',
    component: ProductCategoryComponent,
  },
  {
    path: 'suppliers',
    component: SupplierComponent,
  }
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  entryComponents: [
    ProductUpdateModalComponent,
    ProductCategoryUpdateModalComponent,
    SupplierUpdateModalComponent,
    DeleteDialogComponent,
    ShowedColumnsButtonComponent
  ]
})
export class TablesRoutingModule { }

export const routedComponents = [
  ProductManagementComponent,
  ProductComponent, 
  ProductCategoryComponent,
  SupplierComponent
];
