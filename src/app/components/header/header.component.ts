import { Component, inject } from '@angular/core';
import { MenuServiceService, NavigationService } from './../../services';
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
  private url = '';
  public headerText = ''
  private _menuServiceService: MenuServiceService = inject(MenuServiceService);
  private _navigationService: NavigationService = inject(NavigationService);

  ngOnInit() {
    this._navigationService.getUrl().subscribe((data) => {
      
      const segments = data.split('/')
      const lastSegment = segments[segments.length - 1]

      if (lastSegment === 'edit') {
        this.headerText = 'header.new-song'
      } else if (lastSegment === 'songs') {
        this.headerText = 'header.songs'
      } else {
        this.headerText = ''
      }
    
    
    });
  }

  openModal() {
    this._menuServiceService.setMenuStatus(true);
  }
}
