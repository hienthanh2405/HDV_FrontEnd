import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoService } from './demo.service';
import { AuthService } from './auth.service';
import { UserService } from 'app/@core/data/user.service';
import { RoleService } from 'app/@core/data/role.service';
import { AccessiblePageService } from 'app/@core/data/accessible-page.service';
import { StateService } from 'app/@core/data/state.service';
import { CustomerService } from './customer.service';
import { SupplierService } from 'app/@core/data/supplier.service';
import { StorageService } from './storage.service';
import { ProductCategoryService } from './productCategory.service';
import { ProductService } from './product.service';
import { WarehousingService } from './warehousing.service'
import { CreateWareHousingService } from './createwarehousing.service';

const SERVICES = [
  AuthService,
  DemoService,
  UserService,
  RoleService,
  AccessiblePageService,
  StateService,
  SupplierService,
  StorageService,
  ProductService,
  ProductCategoryService,
  WarehousingService,
  CustomerService,
  CreateWareHousingService
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
