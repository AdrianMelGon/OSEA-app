import { Component, inject } from '@angular/core';
import {MenuServiceService} from './../../services'
import {
  TranslocoModule
} from '@ngneat/transloco';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslocoModule, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  faBars = faBars;
  private _menuServiceService: MenuServiceService = inject(MenuServiceService)

  openModal() {
    this._menuServiceService.setMenuStatus(true)
}

}
