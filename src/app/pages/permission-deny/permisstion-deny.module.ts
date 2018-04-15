import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';
import { PipeModule } from '../../pipes/pipe.module';
import { ThemeModule } from '../../@theme/theme.module';
import { PermissionDenyComponent } from './permission-deny.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    ThemeModule,
    AngularEchartsModule,
    TranslateModule,
    PipeModule
  ],
  declarations: [
    PermissionDenyComponent
  ],
})
export class  PermissionDenyModule { }
