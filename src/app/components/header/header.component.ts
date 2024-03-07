import { Component, inject } from '@angular/core';
import {MenuServiceService} from './../../services'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private _menuServiceService: MenuServiceService = inject(MenuServiceService)

  openModal() {
    this._menuServiceService.setMenuStatus(true)
}

}
