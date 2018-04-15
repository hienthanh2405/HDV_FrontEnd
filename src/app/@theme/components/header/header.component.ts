import { Component, Input, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../@core/data/auth.service';
import { UserService } from 'app/@core/data/user.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position: string = 'normal';

  user: any = {};

  userMenu = [];

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private userService: UserService,
    private analyticsService: AnalyticsService,
    private translateService: TranslateService,
    private authService: AuthService
  ) {
  }

  async ngOnInit() {
    var data = await this.userService.getCurrentUser();
    this.user.name = data.firstName + " " + data.lastName;
    this.user.picture = "assets/images/plt.jpg";
    this.getSubMenu();
  }
  private getSubMenu() {
    let logout = '';
    this.translateService.get('logout').subscribe((res: string) => {
      logout = res;
    });

    let profile = '';
    this.translateService.get('profile').subscribe((res: string) => {
      profile = res;
    });

    this.userMenu = [{ title:  profile  , key: 'PROFILE'}, { title: logout , key: 'LOGOUT' }];
  }
  menuClick(item) { 
    console.log(item);
    if(item.key == 'LOGOUT') {
      this.authService.logout();
    }
  }
  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
