import { Component, OnInit } from '@angular/core';
import { HelperService } from 'app/@core/utils/helper.service';
import { AccessiblePageService } from 'app/@core/data/accessible-page.service';

@Component({
  selector: 'my-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(
    public helperService: HelperService,
    private accessiblePagesSerivce: AccessiblePageService
  ) {
  }
  saleMoneyData = {
    totalMoney: 0,
    totalCash: 0,
    totalBank: 0,
    totalCard: 0
  };
  todayString: string;
  isValidRole = false;

  async ngOnInit() {
    this.todayString = this.helperService.getToday();
    this.isValidRole = await this.accessiblePagesSerivce.isAccessableRole('Dashboard');
  }
}
