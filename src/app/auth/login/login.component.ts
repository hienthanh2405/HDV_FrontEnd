import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../@core/data/auth.service';
import { HelperService } from '../../@core/utils/helper.service';
import { CONSTANT } from '../../constant';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'app/@core/data/user.service';

@Component({
  selector: 'nb-login',
  providers: [],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  user: any = {
    email: '',
    password: ''
  };
  constructor(
    protected router: Router,
    private authService: AuthService,
    private helperService: HelperService,
    private translateService: TranslateService,
    private toastrService: ToastrService,
    private usersService: UserService
  ) {

  }
  async login() {
    try {
      let data = await this.authService.login(this.user.email, this.user.password);
      this.helperService.setLocalStorage(CONSTANT.ACCESS_TOKEN, data['access_token']);
      // we need to calcalate token valid timestamp (on milisecons)
      let expiresIn = data['expires_in'] * 1000;
      let validTimeStamp = + new Date() + expiresIn;
      this.helperService.setLocalStorage(CONSTANT.VALID_TIMESTAMP, validTimeStamp);
      // get user profiles & role
      var userProfile = await this.usersService.getCurrentUser();
      this.helperService.setLocalStorage(CONSTANT.USER_PROFILE, userProfile);
      this.helperService.setLocalStorage(CONSTANT.CURRENT_ROLE, userProfile.roleNames[0]);

      this.router.navigateByUrl('pages');
    } catch (error) {
      let title = '';
      let message = '';
      this.translateService.get('error').subscribe((res: string) => {
        title = res;
      })
      this.translateService.get('wrong_email_or_password').subscribe((res: string) => {
        message = res;
      })
      this.toastrService.error(message, title);
    }
  }
}
