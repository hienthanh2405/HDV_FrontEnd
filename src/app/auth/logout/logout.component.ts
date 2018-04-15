import { Component, Inject } from '@angular/core';
import { AuthService } from '../../@core/data/auth.service';
@Component({
  selector: 'nb-logout',
  providers: [],
  template: ` `,
})
export class LogoutComponent {

  constructor(
    private authService: AuthService,
  ) {
    this.logout();
  }

  async logout() {
    this.authService.logout();
  }
}
