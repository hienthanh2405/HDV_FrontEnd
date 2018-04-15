import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <div>
      <span class="created-by">Plant Store © 2017</span>
      <div>Phiên bản thử nghiệm beta v.0.2</div>
      <div>Mọi báo cáo về lỗi hoặc cải thiện tính năng vui lòng gửi đến chúng tôi tại <a href="https://goo.gl/forms/cNankJORahkKXtqr2">đây</a></div>
    </div>
    <div class="socials">
      <a href="#" target="_blank" class="ion ion-social-github"></a>
      <a href="#" target="_blank" class="ion ion-social-facebook"></a>
      <a href="#" target="_blank" class="ion ion-social-twitter"></a>
      <a href="#" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
