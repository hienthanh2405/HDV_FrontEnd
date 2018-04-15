import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule , routedComponents } from './auth-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import {NbAuthModule } from '@nebular/auth';
import {TranslateModule} from '@ngx-translate/core';

const notRoutedComponents = [
];

@NgModule({
  imports: [
    AuthRoutingModule,
    ThemeModule,
    NbAuthModule,
    TranslateModule
  ],
  declarations: [
    ...routedComponents,
    ...notRoutedComponents
  ],
})
export class AuthModule {
}
