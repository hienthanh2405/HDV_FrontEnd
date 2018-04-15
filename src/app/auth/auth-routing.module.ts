import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import {NbAuthComponent} from '@nebular/auth';
import {LogoutComponent} from './logout/logout.component';

const routes: Routes = [{
  path: '',
  component: NbAuthComponent,
  children: [
    {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}

export const routedComponents = [
  LoginComponent,
  LogoutComponent
];
