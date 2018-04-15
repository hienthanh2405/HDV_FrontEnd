import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import {PermissionDenyModule } from './permission-deny/permisstion-deny.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import {TranslateModule} from '@ngx-translate/core';

const PAGES_COMPONENTS = [
  PagesComponent
];
const GLOBAL_COMPONENTS = [ 
  
]

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    TranslateModule,
    DashboardModule,
    PermissionDenyModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    ...GLOBAL_COMPONENTS
  ],
})
export class PagesModule {
}
