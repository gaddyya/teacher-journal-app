import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {

  public language: string = 'en';

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('ru');
  }

  public switchLanguage(language: string): void {
    if (language === 'en') {
      this.language = 'ru';
      this.translate.use('en');
    } else {
      this.language = 'en';
      this.translate.use('ru');
    }
  }
}
