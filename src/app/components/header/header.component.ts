import { Component, inject } from '@angular/core';
import {
  MenuServiceService,
  NavigationService,
  ApiServiceService,
} from './../../services';
import { TranslocoModule } from '@ngneat/transloco';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslocoModule, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  faBars = faBars;
  public headerText = '';
  private _menuServiceService: MenuServiceService = inject(MenuServiceService);
  private _navigationService: NavigationService = inject(NavigationService);
  private _apiServiceService: ApiServiceService = inject(ApiServiceService);

  ngOnInit() {
    this._navigationService.getUrl().subscribe((data) => {
      const segments = data.split('/');
      const lastSegment = segments[segments.length - 1];

      if (/^\d+$/.test(lastSegment)) {
        this._apiServiceService.getCurrentSong().subscribe((data) => {
          this.headerText = data;
        });
      } else {
        // const lastSegment = segments[segments.length - 1]

        switch (lastSegment) {
          case 'edit':
            this.headerText = 'header.new-song';
            break;
          case 'songs':
            this.headerText = 'header.songs';
            break;
          case 'artists':
            this.headerText = 'header.artists';
            break;
          case 'companies':
            this.headerText = 'header.companies';
            break;
          case '':
            this.headerText = '';
            break;
        }
      }
    });
  }

  openModal() {
    this._menuServiceService.setMenuStatus(true);
  }
}
